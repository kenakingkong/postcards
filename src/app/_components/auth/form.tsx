export default function Form({
  cta,
  callback,
}: {
  cta: string;
  callback: (formData: FormData) => Promise<void>;
}) {
  return (
    <form className="w-full max-w-md mx-auto flex flex-col gap-6">
      <label htmlFor="email" className="hidden">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="enter email"
        required
        className="input-line"
      />
      <label htmlFor="password" className="hidden">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="enter password"
        required
        className="input-line"
      />
      <button formAction={callback} className="btn-primary">
        {cta}
      </button>
    </form>
  );
}
