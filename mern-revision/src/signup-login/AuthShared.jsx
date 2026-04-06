import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const shellGlow =
  "absolute -z-0 rounded-full blur-3xl opacity-40 pointer-events-none";

export function AuthLayout({ children, hero }) {
  return (
    <section className="relative min-h-screen w-full bg-base-100 text-base-content px-4 py-8 md:px-8">
      <div className={`${shellGlow} h-64 w-64 bg-primary/30 -top-6 -left-6`} />
      <div className={`${shellGlow} h-72 w-72 bg-secondary/20 top-20 right-12`} />
      <div className={`${shellGlow} h-60 w-60 bg-accent/20 bottom-8 left-1/3`} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl overflow-hidden rounded-3xl border border-base-content/10 bg-base-100/80 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:grid-cols-2">
        <div className="p-5 sm:p-8 lg:p-12">{children}</div>
        <aside className="hidden lg:flex border-l border-base-content/10 bg-gradient-to-br from-base-200/80 to-base-100 p-10">
          {hero}
        </aside>
      </div>
    </section>
  );
}

export function AuthCard({ title, subtitle, loading, children }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="rounded-3xl border border-base-content/10 bg-base-100/70 p-7 shadow-2xl backdrop-blur-md sm:p-9">
          <header className="mb-7 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
            <p className="text-sm text-base-content/70 sm:text-base">{subtitle}</p>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </header>
          {children}
        </div>
      )}
    </div>
  );
}

export function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="form-control w-full gap-2">
      <span className="label-text text-sm font-semibold text-base-content/90">
        {label}
      </span>
      {children}
    </label>
  );
}

export function InputField({ id, name, type = "text", value, onChange, placeholder, required = true, className = "" }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`input input-bordered h-12 w-full border-base-content/20 bg-base-200/70 text-white placeholder:text-base-content/40 focus:border-primary focus:outline-none ${className}`}
    />
  );
}

export function SelectField({ id, name, value, onChange, options, placeholder = "Select an option", required = true }) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="select select-bordered h-12 w-full border-base-content/20 bg-base-200/70 text-white focus:border-primary"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function PasswordField({
  id,
  name,
  value,
  onChange,
  placeholder,
  isVisible,
  onToggle,
  required = true,
  invalid = false,
}) {
  return (
    <div className="relative">
      <InputField
        id={id}
        name={name}
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={invalid ? "border-error focus:border-error" : ""}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-base-content/70 transition hover:bg-base-100 hover:text-white"
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <FaRegEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}

export function FeaturePanel({ title, description, features, badge, icon }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-3xl border border-base-content/10 bg-base-100/40 p-8 text-white">
      <div className="space-y-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-base-content/70">{description}</p>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-base-content/80">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {badge ? (
        <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          {badge}
        </div>
      ) : null}
    </div>
  );
}

export function PrimaryButton({ children, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`btn h-12 w-full border-none bg-gradient-to-r from-primary to-secondary text-white shadow-lg transition hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  );
}
