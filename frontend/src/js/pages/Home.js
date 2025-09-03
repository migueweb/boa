export default function Home () {
return `

<body class="font-sans leading-relaxed text-gray-950 bg-white">

  <nav class="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold">BOA</span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-gray-500 hover:text-gray-950 transition-colors">Features</a>
          <a href="#tools" class="text-gray-500 hover:text-gray-950 transition-colors">Tools</a>
          <a href="#contact" class="text-gray-500 hover:text-gray-950 transition-colors">Contact</a>
          <a href="/login"
            class="px-4 py-2 rounded-md bg-gray-950 text-white hover:bg-gray-800 transition-all inline-flex items-center gap-2 font-medium text-sm">
            <span class="icon-[tabler--rocket] w-6 h-6"></span>
            Get Started</a>
        </div>
      </div>
    </div>
  </nav>

  <section class=" bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 py-20 pb-32 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-50">
    </div>
    <div class="max-w-7xl mx-auto px-4 relative">
      <div class="text-center max-w-5xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
          <span class="icon-[tabler--trending-up] w-8 h-8"></span>
          Targeting $1.1B SMB Software Market
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 text-balance">
          The <span class="text-gray-950">Scalable Ecosystem</span> for SMB Digital Transformation
        </h1>
        <p class="text-xl text-gray-500 mb-8 max-w-3xl mx-auto text-pretty">
          BOA delivers a unified platform of intelligent business artifacts, starting with reservation
          management
          and expanding into a comprehensive SMB toolkit.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-gray-950">$1100M</div>
            <div class="text-sm text-gray-500">Target Market Size</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-gray-950">85%</div>
            <div class="text-sm text-gray-500">SMBs Need Better Tools</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-gray-950">12x</div>
            <div class="text-sm text-gray-500">Faster Implementation</div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#"
            class="px-8 py-3 rounded-md bg-gray-950 text-white hover:bg-gray-800 transition-all inline-flex items-center gap-2 font-medium text-lg">
            Join Waitlist
            <span class="icon-[tabler--arrow-right] w-6 h-6"></span>
          </a>
        </div>
        <div class="mt-16 grid md:grid-cols-3 gap-8 text-left">
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <div class="w-10 h-10 rounded-lg bg-gray-950/10 flex items-center justify-center mb-4">
              <span class="icon-[tabler--target] w-10 h-10"></span>
            </div>
            <h3 class=" font-semibold mb-2">Massive TAM</h3>
            <p class="text-sm text-gray-500">1.7M SMBs in Colombia alone, with 73% still using
              outdated
              systems for core
              operations</p>
          </div>
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <div class="w-10 h-10 rounded-lg bg-gray-950/10 flex items-center justify-center mb-4">
              <span class="icon-[tabler--join-straight] w-10 h-10"></span>
            </div>
            <h3 class="font-semibold mb-2">Platform Strategy</h3>
            <p class="text-sm text-gray-500">Start with reservations, expand to CRM, inventory, payments
              -
              creating
              sticky ecosystem</p>
          </div>
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <div class="w-10 h-10 rounded-lg bg-gray-950/10 flex items-center justify-center mb-4">
              <span class="icon-[tabler--rocket] w-10 h-10"></span>
            </div>
            <h3 class="font-semibold mb-2">Proven Traction</h3>
            <p class="text-sm text-gray-500">Strong pre-launch demand with validated product-market fit
              across multiple
              verticals</p>
          </div>
        </div>
      </div>
  </section>

  <section class="py-12">
    <h2 class="text-3xl font-bold text-center">Why Choose BOA?</h2>
    <p class="text-center text-gray-500 mb-10">
      Built for modern businesses that need reliable, scalable solutions
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <!-- Card 1 -->
      <div class="p-6 bg-white shadow rounded-2xl text-center">
        <span class="icon-[tabler--mail-fast] w-12 h-12 mx-auto text-gray-900"></span>
        <h3 class="mt-4 font-semibold text-lg">Lightning Fast</h3>
        <p class="text-gray-500">
          Built with modern technology for instant response times and seamless user experience
        </p>
      </div>

      <!-- Card 2 -->
      <div class="p-6 bg-white shadow rounded-2xl text-center">
        <span class="icon-[tabler--shield-lock] w-12 h-12 mx-auto text-gray-900"></span>
        <h3 class="mt-4 font-semibold text-lg">Enterprise Security</h3>
        <p class="text-gray-500">
          Bank-level security with end-to-end encryption to protect your business data
        </p>
      </div>

      <!-- Card 3 -->
      <div class="p-6 bg-white shadow rounded-2xl text-center">
        <span class="icon-[tabler--users] w-12 h-12 mx-auto text-gray-900"></span>
        <h3 class="mt-4 font-semibold text-lg">Team Collaboration</h3>
        <p class="text-gray-500">
          Seamless collaboration tools that keep your team synchronized and productive
        </p>
      </div>
    </div>
  </section>

  <section id="tools" class="py-20">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-gray-200 rounded-full text-sm font-medium mb-6">
          Coming Soon Release</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Our First Artifact</h2>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto">Start your journey with our powerful
          reservation system -
          launching soon</p>
      </div>

      <div
        class="max-w-4xl mx-auto bg-gradient-to-br from-gray-50/30 to-gray-50/10 border border-gray-950/20 rounded-lg p-8">
        <div class="text-center pb-8">
          <div class="w-16 h-16 rounded-xl bg-gray-950/10 flex items-center justify-center mx-auto mb-6">
            <span class="icon-[tabler--calendar] w-12 h-12"></span>
          </div>
          <h3 class="text-2xl font-semibold mb-2">Reservation System</h3>
          <p class="text-lg text-gray-500">
            Complete reservation and schedule management for any type of business - launching soon
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div>
            <h4 class="font-semibold mb-4">Key Features:</h4>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-gray-500">
                <span class="icon-[tabler--clock] w-5 h-5 text-gray-950"></span>
                Real-time availability tracking
              </li>
              <li class="flex items-center gap-2 text-gray-500">
                <span class="icon-[tabler--users] w-5 h-5 text-gray-950"></span>
                Multi-user management
              </li>
              <li class="flex items-center gap-2 text-gray-500">
                <span class="icon-[tabler--calendar-stats] w-5 h-5 text-gray-950"></span>
                Flexible scheduling options
              </li>
              <li class="flex items-center gap-2 text-gray-500">
                <span class="icon-[tabler--bell] w-5 h-5 text-gray-950"></span>
                Automated notifications
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Perfect For:</h4>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Restaurants</span>
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Salons</span>
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Clinics</span>
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Hotels</span>
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Services</span>
              <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">Events</span>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center flex gap-4 justify-center">
          <button
            class="px-8 py-3 rounded-md bg-gray-100 text-gray-950 hover:bg-gray-200 transition-all inline-flex items-center gap-2 font-medium text-lg opacity-50 cursor-not-allowed"
            disabled>
            Coming Soon
            <span class="icon-[tabler--arrow-right] w-5 h-5"></span>
          </button>
          <a href="#"
            class="px-8 py-3 rounded-md bg-transparent text-gray-950 border border-gray-200 hover:bg-gray-50 transition-all inline-flex items-center gap-2 font-medium text-lg">
            Get Notified
            <span class="icon-[tabler--bell] w-6 h-6"></span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class=" py-20 bg-gradient-to-r from-gray-950 to-gray-800 text-white text-center">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
      <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
        Join BOA's ecosystem to streamline your operations and boost
        productivity.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#"
          class="px-8 py-3 rounded-md bg-gray-100 text-gray-950 hover:bg-gray-200 transition-all inline-flex items-center gap-2 font-medium text-lg">
          Start Your Free Trial
          <span class="icon-[tabler--arrow-right] w-6 h-6"></span>
        </a>
        <a href="#"
          class="px-8 py-3 rounded-md bg-transparent text-white border border-white/20 hover:bg-white/10 transition-all inline-flex items-center gap-2 font-medium text-lg">
          Schedule Demo
          <span class="icon-[tabler--calendar-event] w-6 h-6"></span>
        </a>
      </div>
    </div>
  </section>

  <footer id="contact" class="bg-gray-50/30 py-16">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span class="text-xl font-bold">BOA</span>
          </div>
          <p class="text-gray-500 max-w-sm">Empowering small and medium businesses with intelligent
            tools and artifacts
            for the modern world.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Product</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">Reservation
                System</a></li>
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">Coming Soon</a>
            </li>
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">About</a></li>
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">Contact</a></li>
            <li><a href="#" class="text-gray-500 hover:text-gray-950 transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
        <p>&copy; 2024 BOA. All rights reserved.</p>
      </div>
    </div>
  </footer>

  `
  }