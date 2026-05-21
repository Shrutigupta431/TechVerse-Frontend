import { Code2, HeartHandshake } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white border-t border-slate-800">
      {/* Main Footer */}
      <div className="footer sm:footer-horizontal px-10 py-14">
        {/* Brand */}
        <aside>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 shadow-lg">
              <Code2 size={28} className="text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold tracking-wide text-white">
                Tech Verse
              </h2>

              <p className="text-sm text-cyan-400">
                Connect • Collaborate • Build
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            A networking platform where developers, designers, and tech
            enthusiasts meet, collaborate, and build amazing things together 🚀
          </p>
        </aside>

        {/* Navigation */}
        <nav>
          <h6 className="footer-title text-cyan-400">Platform</h6>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Find Developers
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Connections
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Tech Communities
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Developer Feed
          </a>
        </nav>

        {/* Resources */}
        <nav>
          <h6 className="footer-title text-cyan-400">Resources</h6>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Privacy Policy
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Terms & Conditions
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            Support
          </a>

          <a className="link link-hover text-slate-300 hover:text-cyan-400">
            About Us
          </a>
        </nav>

        {/* Social */}
        <nav>
          <h6 className="footer-title text-cyan-400">Connect</h6>

          <div className="flex gap-5 mt-2">
            <a className="cursor-pointer rounded-full bg-slate-800 p-3 transition duration-300 hover:bg-cyan-500 hover:scale-110">
              {/* <Github size={20} /> */}
            </a>

            <a className="cursor-pointer rounded-full bg-slate-800 p-3 transition duration-300 hover:bg-cyan-500 hover:scale-110">
              {/* <Linkedin size={20} /> */}
            </a>

            <a className="cursor-pointer rounded-full bg-slate-800 p-3 transition duration-300 hover:bg-cyan-500 hover:scale-110">
              {/* <Twitter size={20} /> */}
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 px-10 py-5">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-400 md:flex-row">
          <p>© 2026 TechVerse. Built for the developer community.</p>

          <div className="flex items-center gap-2">
            <HeartHandshake size={18} className="text-cyan-400" />

            <p>Helping developers connect worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
