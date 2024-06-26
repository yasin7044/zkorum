import { RouteRecordRaw } from "vue-router";
import OnboardingLayout from "layouts/OnboardingLayout.vue";
import { OnboardingLayoutProps } from "model/props";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    path: "/welcome",
    component: () => import("pages/WelcomePage.vue"),
  },
  {
    path: "/onboarding/login",
    component: OnboardingLayout,
    props: { hasGoBackButton: true, hasHelpButton: true } as OnboardingLayoutProps,
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
    ],
  },
  // {
  //   path: "/onboarding/:flowId/email-verification",
  //   component: () => import("pages/EmailVerification.vue"),
  // },
  // {
  //   path: "/rules/promise",
  //   component: () => import("pages/ModerationRules.vue"),
  // },
  {
    path: "/post",
    component: () => import("layouts/PostLayout.vue"),
    meta: { transition: "slide-enter" },
    children: [
      { path: "", component: () => import("components/TestComponent.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    redirect: "/",
  },
];

export default routes;
