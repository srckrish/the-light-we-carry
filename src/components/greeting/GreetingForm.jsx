
const wishes = [
    {
      value: "subha-tihar",
      label: "Subha Tihar",
    },
    {
      value: "happy-chhath",
      label: "Happy Chhath",
    },
    {
      value: "gratitude-and-light",
      label: "Gratitude and light to your home",
    },
  ];
  
  export default function GreetingForm({
    name,
    setName,
    wish,
    setWish,
  }) {
    return (
      <form
        onSubmit={(event) => event.preventDefault()}
        className="mx-auto w-full max-w-xl space-y-8"
      >
        {/* NAME FIELD */}
        <div className="space-y-3">
          <label
            htmlFor="greeting-name"
            className="block text-sm font-medium text-ivory"
          >
            What should we call you?
          </label>
  
          <input
            id="greeting-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={24}
            placeholder="Enter your name"
            autoComplete="given-name"
            className="w-full rounded-lg border border-ivory/20 bg-ivory/5 px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-diya-gold"
          />
  
          <p className="text-right text-xs text-ivory/40">
            {name.length}/24 characters
          </p>
        </div>
  
        {/* WISH OPTIONS */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-ivory">
            Choose a wish to share
          </legend>
  
          <div className="space-y-3">
            {wishes.map((item) => (
              <label
                key={item.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  wish === item.value
                    ? "border-diya-gold bg-diya-gold/10"
                    : "border-ivory/15 bg-ivory/5 hover:border-ivory/40"
                }`}
              >
                <input
                  type="radio"
                  name="wish"
                  value={item.value}
                  checked={wish === item.value}
                  onChange={(event) => setWish(event.target.value)}
                  className="h-4 w-4 accent-[#D9A441]"
                />
  
                <span className="text-sm text-ivory/85">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
    );
  }
  