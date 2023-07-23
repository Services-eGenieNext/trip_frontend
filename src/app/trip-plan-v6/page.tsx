"use client";
import React from "react";
import PageBanner from "@/components/PageBanner/PageBanner";
import Section from "@/components/UIComponents/Section";
import TripPlanningV6 from "@/components/tripPlanningCard/tripPlanningV6";
import SmallStory from "@/components/Story/SmallStory";
import ClientTestimonials from "@/components/Client-Testimonials/client-testimonials";

export default function page() {
  return (
    <Section>
      <PageBanner title="Bali, Indonesia" />
      <TripPlanningV6 />
      <SmallStory positioning="inline" />
      <ClientTestimonials />
    </Section>
  );
}
