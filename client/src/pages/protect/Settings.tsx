export default function Settings() {
  return (
    <>
      <main className="mx-auto w-full flex-grow">
        <header className="mb-12">
          <h1 className="text-on-surface mb-2 text-4xl font-extrabold tracking-tighter">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your profile information and account security preferences
            below.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* <!-- Profile Section --> */}
          <section className="space-y-8 lg:col-span-7">
            <div className="glass-card shadow-ambient rounded-xl border border-white/20 p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-on-surface text-xl font-bold">
                    Profile Information
                  </h2>
                  <p className="text-on-surface-variant text-sm">
                    Update your photo and personal details.
                  </p>
                </div>
              </div>
              <form className="space-y-6">
                <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
                  <div className="group relative">
                    <img
                      alt="Avatar"
                      className="h-24 w-24 rounded-xl object-cover ring-4 ring-primary/5"
                      data-alt="Close up portrait of a professional man with a kind smile, neutral studio background, soft cinematic lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPqmt5GpOyrHotbv7le0wfNXtdyo_TRpJ4CY86Z-vJOfFS0K7Spwn1DHxs4-IG4M620cd0jAMLeH8qSYubGFVvoputNHp52AZ8BBCrZoYpzwt1uy66aw_K6Tf5KNXC0FEUSB0BaIZTf8s5Dg4EgnrfcllqxO9L9H-R39YjFMUrKQ1Tp_O9_t836r6Y6p7uaFJjok0cE-EKI0vyDOcBNfKMZdKj03POkO9HA1ePkBmcvLowY2Gj43WH8dEEeOvRQIsu6E42wWSxS1s"
                    />
                    <button
                      className="hover:text-primary-container absolute -right-2 -bottom-2 rounded-lg bg-white p-1.5 text-primary shadow-md transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-on-surface font-bold">Your Avatar</h3>
                    <p className="text-on-surface-variant mb-3 text-xs">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                    <div className="flex justify-center gap-2 md:justify-start">
                      <button
                        className="bg-surface-container-low text-on-surface hover:bg-surface-container-high rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
                        type="button"
                      >
                        Upload New
                      </button>
                      <button
                        className="text-error hover:bg-error/5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-on-surface-variant ml-1 text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      className="bg-surface-container-lowest text-on-surface w-full rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. Jane Doe"
                      type="text"
                      value="Alex Rivera"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-on-surface-variant ml-1 text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      className="bg-surface-container-lowest text-on-surface w-full rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="email@example.com"
                      type="email"
                      value="alex.rivera@authify.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-on-surface-variant ml-1 text-sm font-medium">
                    Professional Bio
                  </label>
                  <textarea
                    className="bg-surface-container-lowest text-on-surface w-full resize-none rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="Write a short introduction about yourself..."
                    rows="4"
                  >
                    Senior Product Designer based in San Francisco, focused on
                    building accessible and delightful digital experiences for
                    everyone.
                  </textarea>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    className="to-primary-container rounded-lg bg-gradient-to-r from-primary px-8 py-3 text-sm font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:shadow-lg active:scale-95"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </section>
          {/* <!-- Security Section --> */}
          <section className="space-y-8 lg:col-span-5">
            <div className="glass-card shadow-ambient rounded-xl border border-white/20 p-8">
              <div className="mb-8">
                <h2 className="text-on-surface text-xl font-bold">
                  Password &amp; Security
                </h2>
                <p className="text-on-surface-variant text-sm">
                  Manage your password and authentication.
                </p>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-on-surface-variant ml-1 text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    className="bg-surface-container-lowest text-on-surface w-full rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-on-surface-variant ml-1 text-sm font-medium">
                    New Password
                  </label>
                  <input
                    className="bg-surface-container-lowest text-on-surface w-full rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                    type="password"
                  />
                  <p className="text-on-surface-variant mt-1 px-1 text-[10px]">
                    Must be at least 12 characters with 1 special symbol.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-on-surface-variant ml-1 text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    className="bg-surface-container-lowest text-on-surface w-full rounded-lg border-none px-4 py-3 text-sm shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="pt-2">
                  <button
                    className="bg-surface-container-high text-on-surface hover:bg-surface-dim w-full rounded-lg py-3 text-sm font-bold tracking-wider uppercase transition-colors"
                    type="submit"
                  >
                    Update Password
                  </button>
                </div>
              </form>
              <div className="mt-8 border-t border-slate-100 pt-8 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-on-surface text-sm font-bold">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-on-surface-variant text-[11px]">
                      Recommended for high security accounts.
                    </p>
                  </div>
                  <div className="relative inline-flex cursor-pointer items-center">
                    <div className="bg-primary-fixed-dim h-6 w-11 rounded-full"></div>
                    <div className="absolute top-1 left-1 h-4 w-4 translate-x-5 rounded-full bg-primary transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-6">
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-white p-2 shadow-sm">
                  <span className="material-symbols-outlined text-primary">
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    Trust Score: High
                  </h4>
                  <p className="text-on-surface-variant mt-1 text-xs">
                    Your account has all security measures enabled. You're doing
                    great!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
