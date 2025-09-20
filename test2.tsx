

const sendMethodNotAllowed: NextApiHandler = async (request, response) => {
    return response.status(405).end();
  };
  
  const {
    HEADERS,
    COOKIES: { CSRF_COOKIE_KEY, AUTHORIZATION },
    DISABLE_CAPTCHA,
  } = getConfig();
  
  class NextApiHandlersUtils {
    private handle(
      handler: KyotoNextApiHandler,
      method?: string
    ): KyotoNextApiHandler {
      return async (request, response, ...params) => {
        try {
          const authorization = getAuthorizationHeader(request, response);
          const deviceId = getDeviceIdHeaderOrCookie(request, response);
          const plaform = getPlatformHeaderOrCookie(request, response);
          const idempotencyKey = getIdempotencyKeyHeaderOrCookie(
            request,
            response
          );
  
          request.konnectHeaders = {};
  
          const contentLocation = getLocationCookieFromApiHandler(request);
          const xLocation = getXLocationCookieFromApiHandler(request);
  
          request.contentLocation = contentLocation;
          request.areaCode = contentLocation?.areaCode;
  
          assignIfTruthy(request.konnectHeaders, {
            [HEADERS.DEVICE_ID_KEY]: deviceId,
            [HEADERS.PLATFORM_KEY]: plaform,
            [HEADERS.AUTHORIZATION]: authorization,
            [HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
            [HEADERS.X_LOCATION]: xLocation,
          });
  
          if (!method) return await handler(request, response, ...params);
  
          if (request.method === method) {
            return await handler(request, response, ...params);
          }
  
          await sendMethodNotAllowed(request, response);
        } catch (error) {
          this.handleError(request, response, error);
        }
      };
    }
    private handleError(
      request: NextApiRequest,
      response: NextApiResponse,
      error: any
    ) {
      const dynamicError = get(
        error,
        `response.headers.${X_HEADER_ERROR_TITLE}`
      ) && {
        icon: get(error, `response.headers.${X_HEADER_ERROR_ICON}`),
        title: get(error, `response.headers.${X_HEADER_ERROR_TITLE}`),
        desc: get(error, `response.headers.${X_HEADER_ERROR_DESC}`),
        buttonText: get(error, `response.headers.${X_HEADER_ERROR_BUTTON_TEXT}`),
        deeplink: get(
          error,
          `response.headers.${X_HEADER_ERROR_BUTTON_DEEPLINK}`
        ),
      };
  
      if (axios.isAxiosError(error)) {
        response.status(error.response?.status || 500);
        return response.json({ dynamicError, ...(error.response?.data || {}) });
      }
  
      if (response.statusCode === 200) {
        response.status(500);
      }
  
      if (error instanceof ValidationError) {
        response.status(400);
        return response.json({
          dynamicError,
          message: error.message,
          meta: error,
        });
      }
      if (error instanceof ApiError) {
        response.status(500);
        return response.json({
          dynamicError,
          message: error.statusCode,
          meta: error,
        });
      }
  
      return response.json({ dynamicError, ...error });
    }
    post(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return this.handle(handler, "POST");
    }
    get(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return this.handle(handler, "GET");
    }
    put(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return this.handle(handler, "PUT");
    }
    all(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return this.handle(handler);
    }
  
    methods(handlers: {
      [key in TMethods]?: KyotoNextApiHandler;
    }): KyotoNextApiHandler {
      return async (request, response, ...params) => {
        if (request.method) {
          const _handler = handlers[request.method as TMethods];
          if (_handler) {
            return this.handle(_handler)(request, response, ...params);
          }
        }
  
        return await sendMethodNotAllowed(request, response);
      };
    }
  
    withCSRF(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return (request, response, ...rest) => {
        const token = get(request.cookies, CSRF_COOKIE_KEY);
        const isValid = token && verifyCSRFToken(token);
  
        if (isValid) {
          const cookies = new Cookies(request, response);
          cookies.set(CSRF_COOKIE_KEY, createCSRFToken(), CSRFCookiesOptions);
          return handler(request, response, ...rest);
        }
  
        return response.status(400).json({
          message: "CSRF TOKEN missing or invalid",
        });
      };
    }
  
    authenticated(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return async (request, response, ...rest) => {
        const token = get(
          request.cookies,
          AUTHORIZATION,
          get(request.headers, HEADERS.AUTHORIZATION)?.toString()
        )?.toString();
  
        if (!token) {
          return response.status(403);
        }
  
        try {
          const user = await getUserByToken({
            [HEADERS.AUTHORIZATION]: token,
          });
          request.user = user;
          handler(request, response, ...rest);
        } catch (error) {
          return response.status(403);
        }
      };
    }
  
    withGoogleCaptcha(handler: KyotoNextApiHandler): KyotoNextApiHandler {
      return (request, response, ...rest) => {
        const KEY1 = "g-recaptcha-response";
        const KEY2 = "g_recaptcha_response";
  
        if (DISABLE_CAPTCHA) {
          unset(request.body, KEY1);
          unset(request.body, KEY2);
          return handler(request, response, ...rest);
        }
  
        const token = get(request.body, KEY1) || get(request.body, KEY2);
  
        if (!token) {
          return response.status(400).json({
            message: "g-recaptcha-response missing or invalid",
          });
        }
  
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
        return axios
          .post(url)
          .then((valiadtionResponse) => {
            if (valiadtionResponse.data?.success) {
              unset(request.body, KEY1);
              unset(request.body, KEY2);
              return handler(request, response, ...rest);
            }
  
            throw new Error();
          })
          .catch(() => {
            return response.status(400).json({
              message: "g-recaptcha-response missing or invalid",
            });
          });
      };
    }
  }
  
  export const Handlers = new NextApiHandlersUtils();
  
  export type TMethods = "GET" | "POST" | "PUT" | "DELETE";
  
  export type KotoNextApiRequest = NextApiRequest & {
    konnectHeaders: Record<string, string>;
    contentLocation?: TContentLocationCookieValue;
    areaCode?: number;
    user?: User;
  };
  
  export type KyotoNextApiHandler<T = any> = (
    req: KotoNextApiRequest,
    res: NextApiResponse<T>
  ) => unknown | Promise<unknown>;
  