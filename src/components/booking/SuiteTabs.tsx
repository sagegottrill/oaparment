"use client";

import { useState } from "react";
import type { SuiteProduct } from "@/lib/suites";

type Tab = "description" | "accommodation";

export default function SuiteTabs({ suite }: { suite: SuiteProduct }) {
  const [tab, setTab] = useState<Tab>("description");

  return (
    <section className="suite-tabs">
      <div className="suite-tab-list" role="tablist" aria-label="Suite details">
        {(
          [
            ["description", "Description"],
            ["accommodation", "Accommodation"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            id={`tab-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            className={tab === id ? "suite-tab active" : "suite-tab"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="suite-tab-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "description" ? (
          <>
            {suite.description.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <h3>What this suite offers</h3>
            <div className="suite-offers">
              {suite.offers.map((offer) => (
                <div key={offer.label} className="suite-offer">
                  <span aria-hidden="true">{offer.icon}</span>
                  <strong>{offer.label}</strong>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ul className="suite-accommodation">
            {suite.accommodation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
