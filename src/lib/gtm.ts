/**
 * Google Tag Manager tracking utilities for Xianna User App
 *
 * This module provides functions to track user interactions across the application.
 * All events are sent to the dataLayer for GTM to process.
 */

// Type definitions for GTM events
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

/**
 * Push an event to the GTM dataLayer
 */
export const pushToDataLayer = (event: GTMEvent): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);

    // Log events in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('GTM Event:', event);
    }
  } else {
    console.warn('GTM dataLayer not found');
  }
};

// ==============================================
// HOMEPAGE EVENTS (Página de inicio)
// ==============================================

/**
 * Track click on "Descubre tu estilo" button
 */
export const trackDiscoverStyleClick = (location: 'homepage' | 'navbar' | 'other' = 'homepage') => {
  pushToDataLayer({
    event: 'descubre_tu_estilo_click',
    location,
    page: 'homepage',
  });
};

/**
 * Track click on "Encuentra tu outfit ideal" button
 */
export const trackFindOutfitClick = (location: 'homepage' | 'navbar' | 'other' = 'homepage') => {
  pushToDataLayer({
    event: 'encuentra_outfit_click',
    location,
    page: 'homepage',
  });
};

/**
 * Track click on "Comenzar test gratuito" button
 */
export const trackStartFreeTestClick = (location: string = 'homepage') => {
  pushToDataLayer({
    event: 'comenzar_test_gratuito_click',
    location,
    page: 'homepage',
  });
};

/**
 * Track click on "Explorar blog" button
 */
export const trackExploreBlogClick = (location: string = 'homepage') => {
  pushToDataLayer({
    event: 'explorar_blog_click',
    location,
    page: 'homepage',
  });
};

/**
 * Track click on "Mi perfil" button
 */
export const trackMyProfileClick = (location: 'homepage' | 'navbar' | 'menu' = 'homepage') => {
  pushToDataLayer({
    event: 'mi_perfil_click',
    location,
    page: 'homepage',
  });
};

/**
 * Track click on "Ingresar" button for users without account
 */
export const trackLoginClick = (location: 'homepage' | 'navbar' | 'modal' = 'homepage') => {
  pushToDataLayer({
    event: 'ingresar_click',
    location,
    page: 'homepage',
    user_has_account: false,
  });
};

// ==============================================
// CATALOG EVENTS (Página catálogo principal)
// ==============================================

/**
 * Track filter clicks (occasions + styles)
 */
export const trackCatalogFilterClick = (filterType: 'ocasion' | 'estilo', filterValue: string) => {
  pushToDataLayer({
    event: 'catalogo_filtro_click',
    filter_type: filterType,
    filter_value: filterValue,
    page: 'catalogo',
  });
};

/**
 * Track click on outfit card
 */
export const trackOutfitCardClick = (outfitId: number, outfitName: string, position: number) => {
  pushToDataLayer({
    event: 'outfit_card_click',
    outfit_id: outfitId,
    outfit_name: outfitName,
    position,
    page: 'catalogo',
  });
};

/**
 * Track click on "Iniciar evaluación de estilo" button
 */
export const trackStartStyleEvaluationClick = (location: string = 'catalogo') => {
  pushToDataLayer({
    event: 'iniciar_evaluacion_estilo_click',
    location,
    page: 'catalogo',
  });
};

/**
 * Track click on "Guardar" button (add to favorites)
 */
export const trackSaveOutfitClick = (outfitId: number, outfitName: string, action: 'save' | 'unsave') => {
  pushToDataLayer({
    event: 'guardar_outfit_click',
    outfit_id: outfitId,
    outfit_name: outfitName,
    action,
    page: 'catalogo',
  });
};

/**
 * Track outfit save count (for analytics on most saved outfits)
 */
export const trackOutfitSaveCount = (outfitId: number, outfitName: string, totalSaves: number) => {
  pushToDataLayer({
    event: 'outfit_save_count',
    outfit_id: outfitId,
    outfit_name: outfitName,
    total_saves: totalSaves,
  });
};

/**
 * Track pagination clicks (Ver más / Siguiente página)
 */
export const trackCatalogPaginationClick = (currentPage: number, nextPage: number, scrollDepth?: number) => {
  pushToDataLayer({
    event: 'catalogo_paginacion_click',
    current_page: currentPage,
    next_page: nextPage,
    scroll_depth: scrollDepth,
    page: 'catalogo',
  });
};

// ==============================================
// OUTFIT DETAIL PAGE EVENTS (Product Detail Page)
// ==============================================

/**
 * Track click on "Crear cuenta" button for users without account
 */
export const trackCreateAccountClick = (location: 'outfit_detail' | 'navbar' | 'modal' = 'outfit_detail', outfitId?: number) => {
  pushToDataLayer({
    event: 'crear_cuenta_click',
    location,
    outfit_id: outfitId,
    page: 'outfit_detail',
  });
};

/**
 * Track click on referral links
 */
export const trackReferralLinkClick = (linkType: string, linkUrl: string, outfitId: number) => {
  pushToDataLayer({
    event: 'referral_link_click',
    link_type: linkType,
    link_url: linkUrl,
    outfit_id: outfitId,
    page: 'outfit_detail',
  });
};

/**
 * Track click on "Descubrir mi estilo" for users who haven't taken the test
 */
export const trackDiscoverMyStyleClick = (location: 'outfit_detail' | 'profile' | 'other' = 'outfit_detail', outfitId?: number) => {
  pushToDataLayer({
    event: 'descubrir_mi_estilo_click',
    location,
    outfit_id: outfitId,
    page: location,
  });
};

/**
 * Track click on "Guardar a favoritos" in detail page
 */
export const trackSaveToFavoritesClick = (outfitId: number, outfitName: string, action: 'save' | 'unsave') => {
  pushToDataLayer({
    event: 'guardar_favoritos_click',
    outfit_id: outfitId,
    outfit_name: outfitName,
    action,
    page: 'outfit_detail',
  });
};

/**
 * Track click on "Compartir" button
 */
export const trackShareOutfitClick = (outfitId: number, outfitName: string, shareMethod?: string) => {
  pushToDataLayer({
    event: 'compartir_outfit_click',
    outfit_id: outfitId,
    outfit_name: outfitName,
    share_method: shareMethod,
    page: 'outfit_detail',
  });
};

// ==============================================
// QUESTIONNAIRE EVENTS (Cuestionario)
// ==============================================

/**
 * Track questionnaire start
 */
export const trackQuestionnaireStart = (isLoggedIn: boolean) => {
  pushToDataLayer({
    event: 'cuestionario_inicio',
    user_logged_in: isLoggedIn,
    page: 'formulario',
  });
};

/**
 * Track questionnaire step completion
 */
export const trackQuestionnaireStep = (stepNumber: number, totalSteps: number) => {
  pushToDataLayer({
    event: 'cuestionario_paso',
    step_number: stepNumber,
    total_steps: totalSteps,
    page: 'formulario',
  });
};

/**
 * Track questionnaire completion
 */
export const trackQuestionnaireComplete = (styleResult: string, isLoggedIn: boolean) => {
  pushToDataLayer({
    event: 'cuestionario_completado',
    style_result: styleResult,
    user_logged_in: isLoggedIn,
    page: 'formulario',
  });
};

/**
 * Track click on "Generar resumen visual" (post-questionnaire, logged in)
 */
export const trackGenerateVisualSummaryClick = (styleResult: string) => {
  pushToDataLayer({
    event: 'generar_resumen_visual_click',
    style_result: styleResult,
    page: 'formulario',
  });
};

/**
 * Track click on "Ir a mi perfil" (post-questionnaire, logged in)
 */
export const trackGoToProfileClick = (location: 'formulario' | 'navbar' | 'other' = 'formulario') => {
  pushToDataLayer({
    event: 'ir_a_perfil_click',
    location,
    page: location,
  });
};

/**
 * Track click on "Encuentra tu outfit ideal" (post-questionnaire)
 */
export const trackFindOutfitAfterQuizClick = (styleResult: string) => {
  pushToDataLayer({
    event: 'encuentra_outfit_post_cuestionario_click',
    style_result: styleResult,
    page: 'formulario',
  });
};

/**
 * Track click on "Crear cuenta en Xianna" (post-questionnaire, not logged in)
 */
export const trackCreateAccountAfterQuizClick = (styleResult: string) => {
  pushToDataLayer({
    event: 'crear_cuenta_post_cuestionario_click',
    style_result: styleResult,
    page: 'formulario',
  });
};

// ==============================================
// PROFILE EVENTS (Perfil de usuario)
// ==============================================

/**
 * Track click on "Mis favoritos"
 */
export const trackMyFavoritesClick = (location: 'profile' | 'navbar' | 'menu' = 'profile') => {
  pushToDataLayer({
    event: 'mis_favoritos_click',
    location,
    page: 'perfil',
  });
};

/**
 * Track click on "Descubrir mi estilo" in profile (for users who haven't taken the test)
 */
export const trackDiscoverStyleFromProfileClick = () => {
  pushToDataLayer({
    event: 'descubrir_estilo_perfil_click',
    page: 'perfil',
  });
};

// ==============================================
// BLOG EVENTS (Blog)
// ==============================================

/**
 * Track blog filter clicks
 */
export const trackBlogFilterClick = (filterCategory: string) => {
  pushToDataLayer({
    event: 'blog_filtro_click',
    filter_category: filterCategory,
    page: 'blog',
  });
};

/**
 * Track blog article click
 */
export const trackBlogArticleClick = (blogId: number, blogTitle: string, blogCategory: string, position: number) => {
  pushToDataLayer({
    event: 'blog_articulo_click',
    blog_id: blogId,
    blog_title: blogTitle,
    blog_category: blogCategory,
    position,
    page: 'blog',
  });
};

/**
 * Track blog article rating
 */
export const trackBlogRating = (blogId: number, blogTitle: string, rating: number, isLoggedIn: boolean) => {
  pushToDataLayer({
    event: 'blog_calificacion',
    blog_id: blogId,
    blog_title: blogTitle,
    rating,
    user_logged_in: isLoggedIn,
    page: 'blog_detail',
  });
};

// ==============================================
// USER AUTHENTICATION EVENTS
// ==============================================

/**
 * Track successful login
 */
export const trackLogin = (method: string = 'email') => {
  pushToDataLayer({
    event: 'login_exitoso',
    login_method: method,
  });
};

/**
 * Track successful registration
 */
export const trackRegistration = (method: string = 'email') => {
  pushToDataLayer({
    event: 'registro_exitoso',
    registration_method: method,
  });
};

/**
 * Track logout
 */
export const trackLogout = () => {
  pushToDataLayer({
    event: 'logout',
  });
};

// ==============================================
// PAGE VIEW TRACKING
// ==============================================

/**
 * Track page views (for virtual page views in SPAs)
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Track custom events
 */
export const trackCustomEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  });
};

/**
 * Set user properties
 */
export const setUserProperties = (userId: string, properties: Record<string, any> = {}) => {
  pushToDataLayer({
    event: 'set_user_properties',
    user_id: userId,
    ...properties,
  });
};

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}
