import { d as defineMiddleware, s as sequence } from './chunks/index_BZ0OUuea.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Dm88uqAT.mjs';
import 'kleur/colors';
import './chunks/astro/server_Np7zNMWM.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin") && !context.url.pathname.startsWith("/admin/login")) {
    const accessToken = context.cookies.get("sb-access-token")?.value;
    if (!accessToken) {
      return context.redirect("/admin/login");
    }
    context.locals.user = { email: "admin@geppetto.studio" };
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
