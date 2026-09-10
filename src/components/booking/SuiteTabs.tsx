"use client";

import { useState } from "react";
import type { SuiteProduct } from "@/lib/suites";

type Tab = "description" | "accommodation" | "reviews";

export default function SuiteTabs({ suite }: { suite: SuiteProduct }) {
  const [tab, setTab] = useState<Tab>("description");

  return (
    <section className="suite-tabs">
      <div className="suite-tab-list" role="tablist">
        {(
          [
            ["description", "Description"],
            ["accommodation", "Accommodation Info"],
            ["reviews", "Reviews (0)"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "suite-tab active" : "suite-tab"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="suite-tab-panel">
        {tab === "description" ? (
          <>
            {suite.description.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <h3>What this suite offers</h3>
            <div className="suite-offers">
              {suite.offers.map((offer) => (
                <div key={offer.label} className="suite-offer">
                  <span>{offer.icon}</span>
                  <strong>{offer.label}</strong>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {tab === "accommodation" ? (
          <ul className="suite-accommodation">
            {suite.accommodation.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        ) : null}

        {tab === "reviews" ? (
          <p>No reviews yet. Be the first guest to share your stay at {suite.title}.</p>
        ) : null}
      </div>
    </section>
  );
}
