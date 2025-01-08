import { Rocket, Target, Globe, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Transform Your Digital Experience
          </h1>
          <p className="text-xl text-primary">
            Harness the power of innovation to elevate your digital presence and drive meaningful growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-primary">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Elevate Your Digital Strategy</h2>
          <p className="text-xl text-primary mb-8">Begin your journey towards digital excellence today.</p>
          <button className="bg-white text-background px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Innovation Hub",
    description: "Discover cutting-edge solutions that drive business transformation.",
    icon: Rocket,
  },
  {
    title: "Strategic Growth",
    description: "Achieve your goals with data-driven strategies and insights.",
    icon: Target,
  },
  {
    title: "Global Reach",
    description: "Connect with audiences worldwide through innovative solutions.",
    icon: Globe,
  },
  {
    title: "Rapid Development",
    description: "Accelerate your digital transformation with agile methodologies.",
    icon: Zap,
  },
];

export default Home;