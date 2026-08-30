export interface CropInfo {
  name: string;
  variety: string;
  allocatedArea: string;
  sowingDays: number;
  stage: string;
  status: "Healthy" | "Under Advisory" | "Needs Attention";
  irrigation: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  pictureUrl?: string;
  phone: string;
  address: {
    village: string;
    block: string;
    district: string;
    state: string;
    pincode: string;
  };
  totalArea: string;
  hectares: string;
  crops: CropInfo[];
  soilType: string;
  experienceYears: number;
}

export const FARMERS_DATA: FarmerProfile[] = [
  {
    id: "farmer-1",
    name: "Ramesh Kumar Patel",
    phone: "+91 98765 43210",
    address: {
      village: "Sawojajar",
      block: "Burdwan-I",
      district: "Purba Bardhaman",
      state: "West Bengal",
      pincode: "713101",
    },
    totalArea: "5.5 Acres",
    hectares: "2.23 Ha",
    soilType: "Alluvial Soil",
    experienceYears: 18,
    crops: [
      {
        name: "Rice (Paddy)",
        variety: "Pusa Basmati 1121",
        allocatedArea: "3.5 Acres",
        sowingDays: 48,
        stage: "Active Tillering Phase",
        status: "Healthy",
        irrigation: "Canal & Tube Well",
      },
      {
        name: "Wheat",
        variety: "HD-2967 (Kundan)",
        allocatedArea: "2.0 Acres",
        sowingDays: 28,
        stage: "Seedling & Crown Root",
        status: "Healthy",
        irrigation: "Canal",
      },
    ],
  },
  {
    id: "farmer-2",
    name: "Balwinder Singh Dhillon",
    phone: "+91 98140 76543",
    address: {
      village: "Kalanwali",
      block: "Sirsa-II",
      district: "Sirsa",
      state: "Haryana",
      pincode: "125055",
    },
    totalArea: "8.0 Acres",
    hectares: "3.24 Ha",
    soilType: "Sandy Loam",
    experienceYears: 24,
    crops: [
      {
        name: "Wheat",
        variety: "PBW 550 High Yield",
        allocatedArea: "5.0 Acres",
        sowingDays: 52,
        stage: "Jointing & Stem Extension",
        status: "Healthy",
        irrigation: "Solar Borewell",
      },
      {
        name: "Mustard",
        variety: "Pusa Bold (PR-15)",
        allocatedArea: "3.0 Acres",
        sowingDays: 65,
        stage: "Pod Formation & Filling",
        status: "Under Advisory",
        irrigation: "Drip Sprinkler",
      },
    ],
  },
  {
    id: "farmer-3",
    name: "Sunita Devi Mahato",
    phone: "+91 94312 88901",
    address: {
      village: "Chandankiyari",
      block: "Bokaro Central",
      district: "Bokaro",
      state: "Jharkhand",
      pincode: "828134",
    },
    totalArea: "3.8 Acres",
    hectares: "1.54 Ha",
    soilType: "Red & Laterite Soil",
    experienceYears: 12,
    crops: [
      {
        name: "Maize (Corn)",
        variety: "HQPM-1 Hybrid",
        allocatedArea: "2.0 Acres",
        sowingDays: 42,
        stage: "Vegetative V6 Stage",
        status: "Healthy",
        irrigation: "Rainfed & Pond Lift",
      },
      {
        name: "Potato",
        variety: "Kufri Jyoti",
        allocatedArea: "1.8 Acres",
        sowingDays: 35,
        stage: "Tuber Initiation",
        status: "Needs Attention",
        irrigation: "Furrow Irrigation",
      },
    ],
  },
  {
    id: "farmer-4",
    name: "Rajeshwar Rao",
    phone: "+91 97045 11223",
    address: {
      village: "Khammam Rural",
      block: "Wyra Circle",
      district: "Khammam",
      state: "Telangana",
      pincode: "507002",
    },
    totalArea: "6.2 Acres",
    hectares: "2.51 Ha",
    soilType: "Black Cotton Soil",
    experienceYears: 15,
    crops: [
      {
        name: "Cotton",
        variety: "Bt-Cotton RCH 659",
        allocatedArea: "4.0 Acres",
        sowingDays: 75,
        stage: "Boll Development Stage",
        status: "Healthy",
        irrigation: "Drip Irrigation",
      },
      {
        name: "Red Gram (Pigeon Pea)",
        variety: "ICPL 87119 (Asha)",
        allocatedArea: "2.2 Acres",
        sowingDays: 80,
        stage: "Flowering & Podding",
        status: "Healthy",
        irrigation: "Borewell System",
      },
    ],
  },
  {
    id: "farmer-5",
    name: "Anita Sharma",
    phone: "+91 98290 55432",
    address: {
      village: "Amer Tehsil",
      block: "Jaipur North",
      district: "Jaipur",
      state: "Rajasthan",
      pincode: "302028",
    },
    totalArea: "4.2 Acres",
    hectares: "1.70 Ha",
    soilType: "Desert Loamy Sand",
    experienceYears: 9,
    crops: [
      {
        name: "Pearl Millet (Bajra)",
        variety: "RHB-177 Hybrid",
        allocatedArea: "2.5 Acres",
        sowingDays: 38,
        stage: "Tillering to Stem Elongation",
        status: "Healthy",
        irrigation: "Drip & Micro-Sprinkler",
      },
      {
        name: "Cluster Bean (Guar)",
        variety: "RGC-936",
        allocatedArea: "1.7 Acres",
        sowingDays: 30,
        stage: "Early Vegetative",
        status: "Healthy",
        irrigation: "Rainfed Supplemented",
      },
    ],
  },
  {
    id: "farmer-6",
    name: "Gurpreet Singh Gill",
    phone: "+91 98722 99887",
    address: {
      village: "Bhadaur",
      block: "Barnala West",
      district: "Barnala",
      state: "Punjab",
      pincode: "148102",
    },
    totalArea: "11.0 Acres",
    hectares: "4.45 Ha",
    soilType: "Fertile Alluvial Loam",
    experienceYears: 28,
    crops: [
      {
        name: "Sugarcane",
        variety: "Co 0238 (Early Maturing)",
        allocatedArea: "6.0 Acres",
        sowingDays: 120,
        stage: "Grand Growth Stage",
        status: "Healthy",
        irrigation: "Canal & Submersible Bore",
      },
      {
        name: "Basmati Rice",
        variety: "Pusa Basmati 1509",
        allocatedArea: "5.0 Acres",
        sowingDays: 55,
        stage: "Panicle Initiation",
        status: "Under Advisory",
        irrigation: "Canal System",
      },
    ],
  },
];
