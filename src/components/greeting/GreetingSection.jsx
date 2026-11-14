
import { useState } from "react";
import GreetingForm from "./GreetingForm";
import GreetingPreview from "./GreetingPreview";

export default function GreetingSection() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("subha-tihar");

  return (
    <section
      id="greeting"
      className="bg-midnight px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION INTRODUCTION */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
            A light of your own
          </p>

          <h2 className="font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
            Share a Little
            <br />
            Light.
          </h2>

          <p className="mt-6 text-sm leading-7 text-ivory/65 sm:text-base">
            Make this celebration a little more personal.
            Add your name and choose a wish to share with someone.
          </p>
        </div>

        {/* FORM AND PREVIEW */}
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <GreetingForm
              name={name}
              setName={setName}
              wish={wish}
              setWish={setWish}
            />
          </div>

          <div className="space-y-5">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-ivory/45">
              Your greeting card
            </p>

            <GreetingPreview
              name={name}
              wish={wish}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
