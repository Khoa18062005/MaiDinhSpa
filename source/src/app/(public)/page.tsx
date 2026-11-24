import React from 'react';
import HomePage from '@/components/pages/public/HomePage';
import {
  getFeaturedProducts,
  getFeaturedServices,
  getMembershipTiers,
  getSpaSettings,
  getTestimonials,
} from '@/lib/data';

export default async function LandingRoutePage() {
  const [featuredServices, featuredProducts, tiers, testimonials, settings] =
    await Promise.all([
      getFeaturedServices(),
      getFeaturedProducts(),
      getMembershipTiers(),
      getTestimonials(),
      getSpaSettings(),
    ]);

  return (
    <HomePage
      featuredServices={featuredServices}
      featuredProducts={featuredProducts}
      tiers={tiers}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
