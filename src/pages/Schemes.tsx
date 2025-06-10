import { useState } from "react";
import SchemeHeader from "@/components/SchemeHeader";
import SearchAndFilter from "@/components/SearchAndFilter";
import SchemeResults from "@/components/SchemeResults";
import SchemeCard from "@/components/SchemeCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useLanguage();

  const categories = ["All", "Income Support", "Insurance", "Subsidy", "Loan", "Technology", "Soil Health", "Marketing", "Irrigation", "Seeds", "Equipment"];

  const allSchemes = [
    {
      id: 1,
      title: "PM-KISAN Samman Nidhi",
      description: "Direct income support of ₹6000 per year to farmer families owning cultivable land",
      amount: "₹6,000/year",
      deadline: "Ongoing",
      category: "Income Support",
      status: "Active",
      beneficiaries: "12 Crore+",
      eligibility: "Small and marginal farmers with cultivable land",
      state: "All India",
      launchDate: "2019",
      lastUpdated: "Dec 2024"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme protecting farmers against production risks",
      amount: "Up to ₹2 Lakh",
      deadline: "Seasonal",
      category: "Insurance",
      status: "Active",
      beneficiaries: "5.5 Crore+",
      eligibility: "All farmers growing notified crops",
      state: "All India",
      launchDate: "2016",
      lastUpdated: "Nov 2024"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      description: "Free soil testing and health cards for optimal fertilizer use",
      amount: "Free",
      deadline: "Ongoing",
      category: "Soil Health",
      status: "Active",
      beneficiaries: "22 Crore+",
      eligibility: "All farmers",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Dec 2024"
    },
    {
      id: 4,
      title: "PM Kisan Credit Card",
      description: "Easy access to credit for farmers at subsidized interest rates",
      amount: "Up to ₹3 Lakh",
      deadline: "Ongoing",
      category: "Loan",
      status: "Active",
      beneficiaries: "7 Crore+",
      eligibility: "All farmers with land records",
      state: "All India",
      launchDate: "1998",
      lastUpdated: "Dec 2024"
    },
    {
      id: 5,
      title: "Digital Agriculture Mission 2.0",
      description: "Technology-driven solutions for modern farming practices",
      amount: "₹2,817 Crore",
      deadline: "2024-26",
      category: "Technology",
      status: "Active",
      beneficiaries: "1 Crore+",
      eligibility: "Progressive farmers and FPOs",
      state: "Selected States",
      launchDate: "2021",
      lastUpdated: "Dec 2024"
    },
    {
      id: 6,
      title: "Paramparagat Krishi Vikas Yojana",
      description: "Promotion of organic farming through cluster approach",
      amount: "₹50,000/hectare",
      deadline: "March 2025",
      category: "Subsidy",
      status: "Active",
      beneficiaries: "8 Lakh+",
      eligibility: "Farmers interested in organic farming",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Dec 2024"
    },
    {
      id: 7,
      title: "PM Krishi Sinchai Yojana",
      description: "Expanding cultivated area under assured irrigation and improving water use efficiency",
      amount: "₹50,000 Crore",
      deadline: "2026",
      category: "Irrigation",
      status: "Active",
      beneficiaries: "2 Crore+",
      eligibility: "All farmers with irrigation needs",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Nov 2024"
    },
    {
      id: 8,
      title: "National Seeds Mission",
      description: "Quality seed production and distribution to increase crop productivity",
      amount: "₹25,000/hectare",
      deadline: "Ongoing",
      category: "Seeds",
      status: "Active",
      beneficiaries: "50 Lakh+",
      eligibility: "Seed producing farmers and agencies",
      state: "All India",
      launchDate: "2014",
      lastUpdated: "Oct 2024"
    },
    {
      id: 9,
      title: "Sub-Mission on Agricultural Mechanization",
      description: "Promoting farm mechanization for higher productivity",
      amount: "40-50% subsidy",
      deadline: "2025",
      category: "Equipment",
      status: "Active",
      beneficiaries: "15 Lakh+",
      eligibility: "Individual farmers, FPOs, SHGs",
      state: "All India",
      launchDate: "2014",
      lastUpdated: "Dec 2024"
    },
    {
      id: 10,
      title: "e-NAM (National Agriculture Market)",
      description: "Online trading platform for agricultural commodities",
      amount: "Free platform",
      deadline: "Ongoing",
      category: "Marketing",
      status: "Active",
      beneficiaries: "1.7 Crore+",
      eligibility: "All farmers and traders",
      state: "All India",
      launchDate: "2016",
      lastUpdated: "Dec 2024"
    },
    {
      id: 11,
      title: "Pradhan Mantri Kisan Maan Dhan Yojana",
      description: "Pension scheme for small and marginal farmers",
      amount: "₹3,000/month pension",
      deadline: "Ongoing",
      category: "Income Support",
      status: "Active",
      beneficiaries: "25 Lakh+",
      eligibility: "Small and marginal farmers (18-40 years)",
      state: "All India",
      launchDate: "2019",
      lastUpdated: "Nov 2024"
    },
    {
      id: 12,
      title: "Formation & Promotion of FPOs",
      description: "Supporting formation of Farmer Producer Organizations",
      amount: "₹18.5 Lakh/FPO",
      deadline: "2024-25",
      category: "Subsidy",
      status: "Active",
      beneficiaries: "10,000 FPOs",
      eligibility: "Groups of farmers",
      state: "All India",
      launchDate: "2020",
      lastUpdated: "Oct 2024"
    }
  ];

  const filteredSchemes = allSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <SchemeHeader />

      <div className="container mx-auto px-4 py-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <SchemeResults
          filteredSchemesCount={filteredSchemes.length}
          totalSchemesCount={allSchemes.length}
        />

        {/* Enhanced Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
