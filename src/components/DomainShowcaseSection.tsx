import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Briefcase, Palette, TrendingUp, Search, Building, Edit3 } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.4, 
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const distinguishItems = [
  { id: 1, name: 'landerx.creator', icon: <img  alt="LanderX logo icon" className="w-5 h-5 text-blue-400" src="https://images.unsplash.com/photo-1644256536238-c50d50118af7" /> },
  { id: 2, name: 'robinsonjr.creator', icon: <Users className="w-5 h-5 text-green-400" /> },
  { id: 3, name: 'crystallo.creator', icon: <Palette className="w-5 h-5 text-pink-400" /> },
];

const enterprisePrimaryItems = [
  { id: 1, name: 'app.chase.creator', icon: <img  alt="Chase App logo icon" className="w-5 h-5 text-orange-400" src="https://images.unsplash.com/photo-1676323314353-900b92295a00" /> },
  { id: 2, name: 'j.robinson.creator', icon: <Users className="w-5 h-5 text-teal-400" /> },
  { id: 3, name: 'insights.techco.creator', icon: <Briefcase className="w-5 h-5 text-indigo-400" /> },
];

const enterpriseSecondaryItems = [
  {text: 'Web Business', icon: <Building className="w-3 h-3 text-slate-500 mr-1.5" />}, 
  {text: 'E-commerce Brands', icon: <TrendingUp className="w-3 h-3 text-slate-500 mr-1.5" />}, 
  {text: 'SAAS Startup\'s', icon: <ShieldCheck className="w-3 h-3 text-slate-500 mr-1.5" />}, 
  {text: 'Tech Innovators', icon: <Search className="w-3 h-3 text-slate-500 mr-1.5" />}, 
  {text: 'Marketing Agencies', icon: <Edit3 className="w-3 h-3 text-slate-500 mr-1.5" />}, 
  {text: 'Creative Studios', icon: <Palette className="w-3 h-3 text-slate-500 mr-1.5" /> }
];

const ShowcaseItem = ({ icon, name, index }) => (
  <motion.div
    custom={index}
    variants={itemVariants}
    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/70 rounded-lg p-3 pr-4 flex items-center space-x-3 shadow-lg hover:bg-slate-700/70 transition-colors duration-200"
  >
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">{icon}</div>
    <span className="text-sm font-medium text-slate-200 truncate" title={name}>{name}</span>
    <ShieldCheck className="w-4 h-4 text-primary ml-auto flex-shrink-0" />
  </motion.div>
);

const EnterpriseSecondaryItem = ({ item, index }) => (
   <motion.div
    custom={index + enterprisePrimaryItems.length} 
    variants={itemVariants}
    className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-md px-3 py-1.5 flex items-center text-xs text-slate-400 hover:bg-slate-700/60 transition-colors duration-200 shadow-sm"
  >
    {item.icon}
    <span>{item.text}</span>
  </motion.div>
);


const DomainShowcaseSection = () => {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-gradient-to-br from-slate-900 via-background to-slate-850/70 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/50"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Distinguish yourself</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Elevate your brand with a golden tick and connect with top-tier associates.
          </p>
          <div className="space-y-4">
            {distinguishItems.map((item, index) => (
              <ShowcaseItem key={item.id} icon={item.icon} name={item.name} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-gradient-to-tl from-slate-900 via-background to-slate-850/70 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700/50"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Enterprise Insights</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Insights provides instant access to public sentiment, evolving market patterns, and trends with subdomains.
          </p>
          <div className="space-y-4 mb-8">
            {enterprisePrimaryItems.map((item, index) => (
               <ShowcaseItem key={item.id} icon={item.icon} name={item.name} index={index} />
            ))}
          </div>
           <div className="grid grid-cols-2 gap-3">
            {enterpriseSecondaryItems.map((item, index) => (
              <EnterpriseSecondaryItem key={item.text} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainShowcaseSection;