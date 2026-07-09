"use client";

import { X, Download, Printer, Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
  </svg>
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md transition-all duration-300 animate-fadeIn print:p-0 print:bg-white print:relative print:inset-auto print:z-auto"
    >
      {/* Self-contained print styles to hide homepage background sections during printing */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide all homepage content, navbar, footer, background elements */
          body > * {
            visibility: hidden !important;
            display: none !important;
          }
          /* Show only the printable modal container and force it to fill the page */
          #printable-resume-wrapper {
            visibility: visible !important;
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          #printable-resume-wrapper * {
            visibility: visible !important;
            color: black !important;
            background-color: transparent !important;
            text-shadow: none !important;
            box-shadow: none !important;
          }
          .print-hidden-element {
            display: none !important;
            visibility: hidden !important;
          }
        }
      `}} />

      {/* Modal Container */}
      <div 
        id="printable-resume-wrapper"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal box click
        className="relative w-full max-w-5xl h-[90vh] bg-[#08101A] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl print:h-auto print:border-none print:shadow-none print:bg-white print:rounded-none"
      >
        
        {/* Modal Header (Hidden during Print) */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#090f18] print-hidden-element print:hidden">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-glint animate-pulse" />
            <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider">
              Interactive Resume Viewer
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-glint/20 hover:border-cyan-glint/50 rounded-lg text-xs font-mono tracking-wider text-cyan-glint bg-cyan-glint/5 hover:bg-cyan-glint/10 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <a
              href="/resume.pdf"
              download="Arpit_Sharma_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-glint hover:bg-white text-black rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="p-2 border border-white/10 hover:border-white/20 rounded-lg text-white/70 hover:text-white transition-all ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 font-space text-white print:overflow-visible print:p-0 print:text-black print:bg-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-glint/[0.02] via-transparent to-transparent">
          
          <div className="max-w-4xl mx-auto space-y-10 print:max-w-full">
            
            {/* CV Header */}
            <div className="text-center pb-8 border-b border-white/10 print:border-black/25 print:pb-6">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white print:text-black">
                ARPIT SHARMA
              </h1>
              <p className="font-mono text-xs text-cyan-glint uppercase tracking-[0.25em] mt-2 print:text-cyan-glint">
                Cloud Support & Cybersecurity Specialist
              </p>
              
              {/* Contact Grid */}
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] text-white/60 print:text-black/85">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-glint" />
                  Nadaun, Hamirpur, HP, India
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-glint" />
                  +91 9015399193
                </span>
                <a href="mailto:arpit56665@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-glint transition-colors print:no-underline">
                  <Mail className="w-3.5 h-3.5 text-cyan-glint" />
                  arpit56665@gmail.com
                </a>
                <a href="https://linkedin.com/in/arpit-sharma-812624244" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-glint transition-colors print:no-underline">
                  <LinkedinIcon className="w-3.5 h-3.5 text-cyan-glint" />
                  linkedin.com/in/arpit-sharma-812624244
                </a>
              </div>
            </div>

            {/* Two-Column Content */}
            <div className="grid md:grid-cols-12 gap-10 print:grid-cols-12">
              
              {/* Left Column: Summary, Education, Details */}
              <div className="md:col-span-4 space-y-10 print:col-span-4">
                
                {/* Professional Summary */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Summary
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light print:text-black/90">
                    A motivated and well-organised Computer Science Engineering undergraduate with hands-on knowledge of cloud computing, networking, AI, and cybersecurity fundamentals. Passionate about technology and committed to delivering quality work.
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Education
                  </h3>
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>B.Tech - CSE</span>
                        <span className="font-mono text-[10px] text-white/50 print:text-black/50 font-normal">2023 - 2026</span>
                      </div>
                      <p className="text-white/70 print:text-black/70">Chandigarh Group of Colleges, Landran</p>
                      <span className="inline-block text-[10px] font-mono bg-white/5 px-2 py-0.5 border border-white/10 rounded print:border-black/10">Completed</span>
                      <p className="font-mono text-[10px] text-cyan-glint font-bold mt-1">Score: 7.8 CGPA</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>Diploma - CSE</span>
                        <span className="font-mono text-[10px] text-white/50 print:text-black/50 font-normal">Completed</span>
                      </div>
                      <p className="text-white/70 print:text-black/70">B.R. Ambedkar Govt Polytechnic, Ambota</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>Intermediate - CBSE</span>
                        <span className="font-mono text-[10px] text-white/50 print:text-black/50 font-normal">2021</span>
                      </div>
                      <p className="text-white/70 print:text-black/70">T.R. D.A.V. Public School, Kangoo</p>
                      <p className="font-mono text-[10px] text-cyan-glint font-bold">Score: 81.6%</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Details
                  </h3>
                  <ul className="space-y-2 text-xs font-light text-white/80 print:text-black/90">
                    <li className="flex justify-between">
                      <span className="font-mono text-[10px] opacity-60">Languages:</span>
                      <span>English, Hindi</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-mono text-[10px] opacity-60">Availability:</span>
                      <span>Immediate Joiner</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-mono text-[10px] opacity-60">Relocation:</span>
                      <span>Open</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Right Column: Skills, Projects, Certifications */}
              <div className="md:col-span-8 space-y-10 print:col-span-8">
                
                {/* Technical Skills */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">Cloud Support</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">AWS EC2, S3, IAM, Cloud service troubleshooting</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">Networking</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">TCP/IP, DNS, DHCP, Wired/Wireless setup, Basic Firewall</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">IT Support</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">Hardware diagnostics, Software config, Login issue troubleshooting</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">Operating Systems</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">Windows 10/11 (admin/registry), Linux Ubuntu/Kali (terminal/permissions)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">AI Tools & Dev</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">Prompt Engineering (ChatGPT, Claude), Databases (MySQL, MongoDB)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white print:text-black mb-1">Documentation</h4>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">Technical issue logging, Knowledge base writing, SRS documents</p>
                    </div>
                  </div>
                </div>

                {/* Projects & Internships */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Projects & Internships
                  </h3>
                  <div className="space-y-6 text-xs">
                    {/* Project 1 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline font-bold text-white print:text-black">
                        <span className="text-sm">1. Honeypot Security & System Monitoring System</span>
                        <span className="font-mono text-[9px] font-normal text-cyan-glint">Python · Flask · Paramiko · Linux</span>
                      </div>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">
                        Deployed a network monitoring system to capture and log all unauthorized access attempts on SSH and HTTP services. Simulated real-world helpdesk incident logging and system health monitoring.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-[11px] text-white/60 print:text-black/60 pl-2">
                        <li>Event Logging: Captured attacker IPs, credentials, commands, and timestamps in structured logs.</li>
                        <li>Configured SSH daemon settings, service listeners, and applied OS hardening practices.</li>
                        <li>Produced forensic-style incident reports for system audits.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline font-bold text-white print:text-black">
                        <span className="text-sm">2. SHIKSHARTHEE — Web-Based E-Learning Platform</span>
                        <span className="font-mono text-[9px] font-normal text-cyan-glint">React.js · Node.js · MongoDB · Intern</span>
                      </div>
                      <p className="text-white/75 print:text-black/70 leading-relaxed">
                        Built a full-stack Learning Management System (LMS) during a 6-month internship at Ziion Technology, providing course management, content delivery, assignments, quizzes, and progress analytics.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-[11px] text-white/60 print:text-black/60 pl-2">
                        <li>Developed responsive instructor/student dashboards with learning content display.</li>
                        <li>Engineered JWT auth, course CRUD APIs, quiz submissions, and role-based access control.</li>
                        <li>Designed MongoDB schemas covering user progress records and calendar scheduling.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-cyan-glint tracking-widest border-b border-cyan-glint/20 pb-1.5 print:text-cyan-glint print:border-black/15">
                    Certifications & Training
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-white/80 print:text-black/90">
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">AWS Cloud Support Essentials</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">Amazon Web Services</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">AWS Technical Essentials</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">Amazon Web Services</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">Information Security Fundamentals</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">Infosys</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">PHP Web Development</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">CS Infotech</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">Machine Learning Essentials</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">TCIL-IT</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-glint">✔</span>
                      <div>
                        <strong className="text-white print:text-black">Software Conceptual Design</strong>
                        <p className="text-[10px] text-white/50 print:text-black/50">NPTEL</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
