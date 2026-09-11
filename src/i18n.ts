import { Language } from './types';

export interface Translations {
  appName: string;
  tagline: string;
  directMotto: string;
  viewSwitch: {
    client: string;
    admin: string;
    rider: string;
    farmer: string;
    clientSub: string;
    adminSub: string;
    riderSub: string;
    farmerSub: string;
  };
  common: {
    search: string;
    all: string;
    kg: string;
    rupees: string;
    viewDetails: string;
    close: string;
    save: string;
    cancel: string;
    confirm: string;
    status: string;
    total: string;
    date: string;
    phone: string;
    address: string;
    action: string;
    language: string;
    live: string;
    verified: string;
    unverified: string;
    success: string;
  };
  grades: {
    title: string;
    ruleHint: string;
    gradeA: string;
    gradeADesc: string;
    gradeB: string;
    gradeBDesc: string;
    gradeC: string;
    gradeCDesc: string;
  };
  client: {
    title: string;
    deliveryPromise: string;
    chooseFarmerTitle: string;
    chooseGradeTitle: string;
    freshFromFarmer: string;
    distanceAway: string;
    organicBadge: string;
    kisanId: string;
    addToCart: string;
    added: string;
    viewCart: string;
    emptyCart: string;
    cartSummary: string;
    orderType: string;
    regularOrder: string;
    regularOrderDesc: string;
    bulkOrder: string;
    bulkOrderDesc: string;
    bulkNotice: string;
    tokenAmountTitle: string;
    tokenPercentageNotice: string;
    tokenRemainingTitle: string;
    paymentMethod: string;
    prepaid: string;
    prepaidDesc: string;
    cod: string;
    codDesc: string;
    checkoutBtn: string;
    placingOrder: string;
    orderSuccess: string;
    trackOrder: string;
    customerCareBtn: string;
    customerCareTitle: string;
    chatWithAdmin: string;
    typeMessage: string;
    send: string;
    myOrders: string;
    liveTracker: string;
    currentStage: string;
    orderNumber: string;
    farmerOrigin: string;
  };
  admin: {
    title: string;
    subTitle: string;
    localOfficer: string;
    mandiHub: string;
    tabs: {
      farmers: string;
      stockQuality: string;
      bulkAllocations: string;
      customerCare: string;
    };
    farmerManagement: string;
    addFarmer: string;
    verifyStatus: string;
    verifyFarmerBtn: string;
    verifiedSuccess: string;
    stockAndGrading: string;
    gradePricingRule: string;
    qualityInspection: string;
    inspectAndGradeBtn: string;
    qualityScore: string;
    bulkDutyTitle: string;
    bulkDutyDesc: string;
    allocateStockBtn: string;
    cancelOrderBtn: string;
    allocatedSuccess: string;
    cancelledSuccess: string;
    careDeskTitle: string;
    careDeskDesc: string;
    replyAsOfficer: string;
    resolvedStatus: string;
    markResolved: string;
  };
  rider: {
    title: string;
    dutyStatus: string;
    activeTasks: string;
    todayTrips: string;
    todayEarnings: string;
    pickupLocation: string;
    deliveryLocation: string;
    orderType: string;
    paymentToCollect: string;
    alreadyPrepaid: string;
    collectCod: string;
    collectTokenBalance: string;
    actions: {
      accept: string;
      reachedFarm: string;
      pickedUp: string;
      outForDelivery: string;
      delivered: string;
    };
    callFarmer: string;
    callCustomer: string;
    callAdmin: string;
  };
  farmerPanel: {
    title: string;
    subTitle: string;
    switchFarmer: string;
    tabs: {
      reviews: string;
      rating: string;
      earnings: string;
      support: string;
    };
    reviews: {
      buyerReviews: string;
      verifiedBuyer: string;
      replyPlaceholder: string;
      sendReply: string;
      noReviews: string;
      filterAll: string;
    };
    rating: {
      overallScore: string;
      qualityScore: string;
      onTimeHarvest: string;
      zeroRejection: string;
      badgesEarned: string;
      ratingDistribution: string;
    };
    earnings: {
      totalEarnings: string;
      settledAmount: string;
      pendingAmount: string;
      directBankNote: string;
      requestAdvance: string;
      advanceSuccess: string;
      transactionHistory: string;
      quantity: string;
      rate: string;
      status: string;
    };
    support: {
      officerTitle: string;
      officerName: string;
      officerContact: string;
      directDeskNotice: string;
      yourTickets: string;
      raiseTicket: string;
      subject: string;
      category: string;
      message: string;
      submit: string;
      replyAsFarmer: string;
      send: string;
    };
  };
  forecasting: {
    tabTitle: string;
    badge: string;
    title: string;
    subtitle: string;
    runForecastBtn: string;
    runningAi: string;
    confidence: string;
    tomorrowDemand: string;
    cropBreakdown: string;
    quotaAllocation: string;
    allocateQuotaBtn: string;
    quotaAllocated: string;
    urgencyHigh: string;
    urgencyCritical: string;
    urgencyNormal: string;
    currentStock: string;
    predictedDemand: string;
    deficit: string;
    weatherImpact: string;
    strategicAdvisories: string;
    filterWeather: string;
    filterEvent: string;
    filterTimeframe: string;
  };
  chooseSide: {
    brandTagline: string;
    zeroMiddlemen: string;
    subtitle: string;
    farmerLabel: string;
    farmerDesc: string;
    adminLabel: string;
    adminDesc: string;
    buyerLabel: string;
    buyerDesc: string;
    riderLabel: string;
    riderDesc: string;
  };
  login: {
    farmerTitle: string;
    farmerSubtitle: string;
    adminTitle: string;
    adminSubtitle: string;
    riderTitle: string;
    riderSubtitle: string;
    phoneLabel: string;
    adminIdLabel: string;
    passwordLabel: string;
    enterPhone: string;
    enterAdminId: string;
    enterPassword: string;
    signIn: string;
    forgotPassword: string;
    backToSelect: string;
    demoCredentials: string;
    passwordNotice: string;
  };
  header: {
    mandiDirect: string;
    directFarmToFork: string;
    active: string;
    switchPortal: string;
    logout: string;
    roles: {
      buyer: string;
      farmer: string;
      admin: string;
      rider: string;
    };
  };
  farmerDesk: {
    heroTitle: string;
    kisanId: string;
    organicBadge: string;
    village: string;
    distance: string;
    phone: string;
    cropsSown: string;
    rating: string;
    settled: string;
    escrow: string;
    switchFarmer: string;
    loggedInAs: string;
    tabs: {
      reviews: string;
      stock: string;
      earnings: string;
      support: string;
      quota: string;
    };
  };
  clientExtra: {
    noticeOnGrades: string;
    fairMandiTariff: string;
    lowerGradeCheaper: string;
    activeRate: string;
    recentOrders: string;
    close: string;
    categories: {
      all: string;
      staples: string;
      grains: string;
      leafy: string;
      gourds: string;
      beans: string;
      root: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Krishihaat',
    tagline: 'Fresh Vegetables Directly From Farmers - Zero Middlemen',
    directMotto: '100% money goes to local producers. Fair mandi rates & verified quality.',
    viewSwitch: {
      client: 'Customer Store',
      admin: 'Local Admin Hub',
      rider: 'Delivery Rider',
      farmer: 'Farmer Support Desk',
      clientSub: 'Browse, Choose Farmer & Order',
      adminSub: 'Verify Farmers, Stock, Quality & Care',
      riderSub: 'Pickups, Delivery & Payments',
      farmerSub: 'Harvest Stock, Reviews, Payouts & Quota',
    },
    common: {
      search: 'Search farm fresh vegetables (potato, tomato, spinach...)',
      all: 'All',
      kg: 'kg',
      rupees: '₹',
      viewDetails: 'View Details',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      status: 'Status',
      total: 'Total',
      date: 'Date',
      phone: 'Phone',
      address: 'Address',
      action: 'Action',
      language: 'Language',
      live: 'LIVE',
      verified: 'Verified Farmer',
      unverified: 'Pending Verification',
      success: 'Success',
    },
    grades: {
      title: 'Vegetable Quality Grades',
      ruleHint: 'Official Rule: Lower the vegetable grade, cheaper is the price.',
      gradeA: 'Grade A - Premium',
      gradeADesc: 'Uniform shape, zero blemishes, crispest texture, top shelf-life.',
      gradeB: 'Grade B - Standard',
      gradeBDesc: 'Freshly harvested, minor cosmetic variation, ideal for daily household cooking.',
      gradeC: 'Grade C - Economy / Processing',
      gradeCDesc: 'Uneven size/ripe, lowest price, best for restaurant gravies, purees & pastes.',
    },
    client: {
      title: 'Farm Fresh Direct Market',
      deliveryPromise: 'Next-Day Morning Delivery (7:00 AM - 11:00 AM) across entire locality',
      chooseFarmerTitle: 'Choose Your Farmer',
      chooseGradeTitle: 'Select Grade (Cheaper at Lower Grades)',
      freshFromFarmer: 'Grown by',
      distanceAway: 'km away',
      organicBadge: 'Natural / Organic',
      kisanId: 'Kisan ID',
      addToCart: 'Add to Cart',
      added: 'Added',
      viewCart: 'Cart',
      emptyCart: 'Your basket is empty. Select farm vegetables to begin!',
      cartSummary: 'Order Summary',
      orderType: 'Order Type',
      regularOrder: 'Regular Order (Household)',
      regularOrderDesc: 'Next-day doorstep harvest delivery across the entire locality.',
      bulkOrder: 'Bulk Order (50kg+ or Catering/Retail)',
      bulkOrderDesc: 'Allocated by Local Admin. Requires min 30% advance token.',
      bulkNotice: 'Bulk Order Rule: Minimum 30% advance token money must be paid beforehand. The remaining balance is paid upon physical delivery verification.',
      tokenAmountTitle: 'Advance Token Payment (Min 30%)',
      tokenPercentageNotice: 'You are paying this token amount now to book the farmer stock.',
      tokenRemainingTitle: 'Remaining Balance (Pay on Delivery)',
      paymentMethod: 'Select Payment Method',
      prepaid: 'Prepaid (UPI / PhonePe / GPay / NetBanking)',
      prepaidDesc: 'Zero contact instant digital settlement',
      cod: 'Cash on Delivery (COD)',
      codDesc: 'Pay cash or UPI directly to delivery rider upon arrival',
      checkoutBtn: 'Place Direct Farm Order',
      placingOrder: 'Processing your farm order...',
      orderSuccess: 'Order placed successfully! Verified by Local Mandi Admin.',
      trackOrder: 'Track Order Live',
      customerCareBtn: 'Local Customer Care Desk',
      customerCareTitle: 'Customer Care (Direct to Local Admin)',
      chatWithAdmin: 'Speak with your Local Hub Administrator for questions, refunds, or farmer visits.',
      typeMessage: 'Type your message or complaint...',
      send: 'Send',
      myOrders: 'My Orders',
      liveTracker: 'Live Mandi-to-Doorstep Tracking',
      currentStage: 'Current Stage',
      orderNumber: 'Order #',
      farmerOrigin: 'Direct Farmer Origin',
    },
    admin: {
      title: 'Local Mandi Hub Admin Portal',
      subTitle: 'Local Cluster Officer: Rameshwar Patel (Sehore Rural Tehsil Hub)',
      localOfficer: 'Local Mandi Officer',
      mandiHub: 'Hub: Sehore Kisan Kendra #04',
      tabs: {
        farmers: 'Farmers & Verification',
        stockQuality: 'Stock & Quality Grading',
        bulkAllocations: 'Bulk Orders & Allocation',
        customerCare: 'Customer Care Desk',
      },
      farmerManagement: 'Local Farmer Onboarding & Verification',
      addFarmer: 'Register New Local Farmer',
      verifyStatus: 'Verification Status',
      verifyFarmerBtn: 'Verify Farmer & Inspect Farm',
      verifiedSuccess: 'Farmer marked verified and accredited for public sales.',
      stockAndGrading: 'Harvest Stock & Quality Inspection',
      gradePricingRule: 'Grade Pricing Formula: Grade A is Base Price, Grade B is ~28% discount, Grade C is ~52% discount.',
      qualityInspection: 'Quality & Moisture Checklist',
      inspectAndGradeBtn: 'Update Grade & Price',
      qualityScore: 'Quality Score',
      bulkDutyTitle: 'Bulk Order Stock Allocation & Decision',
      bulkDutyDesc: 'As Local Admin, allocate harvest stocks across verified farmers or cancel requests if supply is constrained.',
      allocateStockBtn: 'Allocate Stocks & Dispatch to Rider',
      cancelOrderBtn: 'Cancel / Reject Request',
      allocatedSuccess: 'Bulk quota successfully allocated to farmer stocks!',
      cancelledSuccess: 'Bulk request rejected with notification sent to buyer.',
      careDeskTitle: 'Local Customer Care Support Desk',
      careDeskDesc: 'Direct line between local buyers, crop complaints, delivery delays, and Mandi Hub.',
      replyAsOfficer: 'Reply as Local Mandi Officer',
      resolvedStatus: 'Ticket Status',
      markResolved: 'Mark as Resolved',
    },
    rider: {
      title: 'Krishihaat Delivery Rider App',
      dutyStatus: 'Active on Duty',
      activeTasks: 'Assigned Pickups & Deliveries',
      todayTrips: 'Trips Completed Today',
      todayEarnings: 'Today Earnings (Inc. Mileage)',
      pickupLocation: 'Farmer Collection Point',
      deliveryLocation: 'Customer Doorstep',
      orderType: 'Consignment Type',
      paymentToCollect: 'Payment Action on Doorstep',
      alreadyPrepaid: 'Prepaid Order - No Cash to Collect (₹0)',
      collectCod: 'Collect Full COD Amount',
      collectTokenBalance: 'Collect Remaining 70% Bulk Balance',
      actions: {
        accept: 'Accept Order',
        reachedFarm: 'Reached Farmer / Village Hub',
        pickedUp: 'Picked Up & Weighed',
        outForDelivery: 'Out for Delivery',
        delivered: 'Mark Delivered & Complete',
      },
      callFarmer: 'Call Farmer',
      callCustomer: 'Call Customer',
      callAdmin: 'Call Local Admin (Hub)',
    },
    farmerPanel: {
      title: 'Farmer Dashboard & Support',
      subTitle: 'Transparent Mandi ratings, buyer feedback, zero-middleman earnings, and instant admin support desk.',
      switchFarmer: 'Select Farmer View',
      tabs: {
        reviews: 'Buyer Reviews',
        rating: 'Ratings & Quality',
        earnings: 'Earnings & Payouts',
        support: 'Admin Support Desk',
      },
      reviews: {
        buyerReviews: 'Verified Buyer Reviews',
        verifiedBuyer: 'Verified Mandi Purchase',
        replyPlaceholder: 'Write a thank-you note or farmer clarification...',
        sendReply: 'Send Reply',
        noReviews: 'No reviews found for this filter.',
        filterAll: 'All Crops',
      },
      rating: {
        overallScore: 'Overall Mandi Rating',
        qualityScore: 'Inspection Quality Score',
        onTimeHarvest: 'Harvest Fulfillment Rate',
        zeroRejection: 'Zero-Rejection Quality Record',
        badgesEarned: 'Badges & Mandi Accreditations',
        ratingDistribution: 'Star Rating Distribution',
      },
      earnings: {
        totalEarnings: 'Total Mandi Earnings',
        settledAmount: 'Settled to Bank A/c',
        pendingAmount: 'Pending Route Clearance',
        directBankNote: '100% Zero-Commission Guarantee: Every rupee paid by customers is directly credited to your farmer account.',
        requestAdvance: 'Request Instant Advance Settlement',
        advanceSuccess: 'Advance payout requested! Funds credited directly to your bank account.',
        transactionHistory: 'Direct Payout & Sales Ledger',
        quantity: 'Qty Sold',
        rate: 'Rate/kg',
        status: 'Status',
      },
      support: {
        officerTitle: 'Local Mandi Officer',
        officerName: 'Rameshwar Patel (Sehore Rural Kendra)',
        officerContact: '+91 94250 11988',
        directDeskNotice: 'Direct priority communications line for collection crates, harvest quotas, grading verification, and payout assistance.',
        yourTickets: 'Support Inquiries & Tickets',
        raiseTicket: 'Raise New Support Request',
        subject: 'Inquiry Topic / Subject',
        category: 'Support Category',
        message: 'Describe your request for the Local Admin...',
        submit: 'Send Support Request',
        replyAsFarmer: 'Type your message to Local Admin...',
        send: 'Send Reply',
      },
    },
    forecasting: {
      tabTitle: 'AI Demand Forecast',
      badge: 'Gemini AI Telemetry',
      title: 'AI Locality Demand Forecasting & Harvest Quota',
      subtitle: 'Predict tomorrow morning demand for Potatoes, Rice, Onion & Wheat across Sehore locality. Automatically allocate farmer harvest quotas without food waste.',
      runForecastBtn: 'Run AI Demand Simulation',
      runningAi: 'Analyzing Sehore Mandi Data with Gemini...',
      confidence: 'Confidence Score',
      tomorrowDemand: 'Next-Day Locality Demand',
      cropBreakdown: 'Crop Demand vs Stock Analysis',
      quotaAllocation: 'Farmer Harvest Quota Allocations',
      allocateQuotaBtn: 'Allocate Morning Harvest Quota',
      quotaAllocated: 'Quota Dispatched to Farmer Desk',
      urgencyHigh: 'High Demand Surge',
      urgencyCritical: 'Stock Deficit Alert',
      urgencyNormal: 'Balanced Supply',
      currentStock: 'Current Mandi Stock',
      predictedDemand: 'Predicted Demand',
      deficit: 'Shortfall Deficit',
      weatherImpact: 'Weather & Agrometeorology Impact',
      strategicAdvisories: 'Mandi Economic Directives',
      filterWeather: 'Weather Condition',
      filterEvent: 'Locality Event Context',
      filterTimeframe: 'Time Horizon',
    },
    chooseSide: {
      brandTagline: 'DIRECT • FAST • FRESH',
      zeroMiddlemen: 'Zero Middlemen Direct Mandi Network',
      subtitle: 'Select your portal to proceed',
      farmerLabel: "I'm farmer",
      farmerDesc: 'Crops, Daily Harvest Quota, Pricing & Mandi Payouts',
      adminLabel: "I'm Admin",
      adminDesc: 'Mandi Hub Allocation, Gemini AI Forecast & Oversight',
      buyerLabel: "I'm Buyer",
      buyerDesc: 'Direct Farm-to-Fork Store, Grades A/B/C & Cart',
      riderLabel: 'I deliver',
      riderDesc: 'Electric Van Fleet, Routes, Pickups & OTP Drops',
    },
    login: {
      farmerTitle: 'Farmer Mandi Portal',
      farmerSubtitle: 'Sign in with your registered Kisan Phone & Password',
      adminTitle: 'Admin Mandi Hub',
      adminSubtitle: 'Sign in with your Mandi Officer credentials',
      riderTitle: 'Delivery Fleet Portal',
      riderSubtitle: 'Sign in with your Driver Phone & PIN',
      phoneLabel: 'Mobile Phone Number',
      adminIdLabel: 'Admin ID or Phone',
      passwordLabel: 'Password',
      enterPhone: 'Enter registered mobile number',
      enterAdminId: 'Enter officer phone or admin ID',
      enterPassword: 'Enter account password',
      signIn: 'Log In to Portal',
      forgotPassword: 'Forgot Password?',
      backToSelect: 'Back to Role Selection',
      demoCredentials: 'Demo Login Credentials',
      passwordNotice: 'State Agriculture Mandi Board verified portal.',
    },
    header: {
      mandiDirect: 'MANDI DIRECT',
      directFarmToFork: '100% DIRECT FARM-TO-FORK',
      active: 'Active:',
      switchPortal: 'Switch Portal',
      logout: 'Log Out',
      roles: {
        buyer: 'Buyer',
        farmer: 'Farmer',
        admin: 'Admin Hub',
        rider: 'Rider',
      },
    },
    farmerDesk: {
      heroTitle: 'Farmer Mandi Desk',
      kisanId: 'Kisan ID',
      organicBadge: 'Organic Certified',
      village: 'Village',
      distance: 'Distance to Mandi',
      phone: 'Phone',
      cropsSown: 'Crops Sown',
      rating: 'Rating',
      settled: 'Settled',
      escrow: 'Escrow',
      switchFarmer: 'Switch Farmer',
      loggedInAs: 'Logged In As Farmer',
      tabs: {
        reviews: 'Customer Reviews & Ratings',
        stock: 'My Harvest Stock & Grading',
        earnings: 'Earnings & Mandi Payouts',
        support: 'Local Admin Mandi Desk',
        quota: "AI Quota & Tomorrow's Harvest",
      },
    },
    clientExtra: {
      noticeOnGrades: 'Notice on Grades:',
      fairMandiTariff: 'FAIR MANDI TARIFF',
      lowerGradeCheaper: 'Lower Grade = Cheaper Price',
      activeRate: 'Active Rate',
      recentOrders: 'Recent Direct Farm Orders',
      close: 'Close',
      categories: {
        all: 'All',
        staples: 'Potatoes & Onions',
        grains: 'Rice & Wheat',
        leafy: 'Leafy Greens',
        gourds: 'Gourds & Squashes',
        beans: 'Beans & Legumes',
        root: 'Root Vegetables',
      },
    },
  },
  hi: {
    appName: 'कृषिहाट',
    tagline: 'सीधे किसान से ताज़ी सब्ज़ियाँ - कोई बिचौलिया नहीं',
    directMotto: '100% भुगतान स्थानीय किसानों को। उचित मंडी भाव व जाँची गई गुणवत्ता।',
    viewSwitch: {
      client: 'ग्राहक पोर्टल',
      admin: 'लोकल एडमिन हब',
      rider: 'डिलीवरी राइडर',
      farmer: 'किसान सहायता डेस्क',
      clientSub: 'सब्ज़ी चुनें, किसान चुनें व ऑर्डर करें',
      adminSub: 'किसान सत्यापन, स्टॉक, ग्रेड व सहायता',
      riderSub: 'पिकअप, डिलीवरी व भुगतान',
      farmerSub: 'फसल स्टॉक, समीक्षा, भुगतान व कोटा',
    },
    common: {
      search: 'खेत की ताज़ी सब्ज़ियाँ खोजें (आलू, टमाटर, पालक, गोभी...)',
      all: 'सभी',
      kg: 'किलो',
      rupees: '₹',
      viewDetails: 'विवरण देखें',
      close: 'बंद करें',
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      status: 'स्थिति',
      total: 'कुल योग',
      date: 'तारीख',
      phone: 'फ़ोन',
      address: 'पता',
      action: 'कार्य',
      language: 'भाषा',
      live: 'लाइव',
      verified: 'सत्यापित किसान',
      unverified: 'सत्यापन लंबित',
      success: 'सफल',
    },
    grades: {
      title: 'सब्ज़ी गुणवत्ता ग्रेड',
      ruleHint: 'मंडी नियम: सब्ज़ी का ग्रेड जितना कम होगा, दाम उतना ही सस्ता होगा।',
      gradeA: 'ग्रेड A - प्रीमियम गुणवत्ता',
      gradeADesc: 'एक समान आकार, बिल्कुल बेदाग, सबसे ताज़ा व अधिक समय तक सुरक्षित।',
      gradeB: 'ग्रेड B - सामान्य मानक गुणवत्ता',
      gradeBDesc: 'खेत से ताज़ा, हल्का प्राकृतिक आकार अंतर, रोज़मर्रा के भोजन हेतु उत्तम।',
      gradeC: 'ग्रेड C - किफायती / पकाने योग्य ग्रेड',
      gradeCDesc: 'छोटा/असमान आकार, सबसे सस्ता दाम, होटल, ग्रेवी व पकाने के लिए उपयुक्त।',
    },
    client: {
      title: 'सीधा किसान बाज़ार',
      deliveryPromise: 'संपूर्ण इलाके में अगले दिन सुबह (7:00 - 11:00 AM) ताज़ा डिलीवरी',
      chooseFarmerTitle: 'अपना पसंदीदा किसान चुनें',
      chooseGradeTitle: 'सब्ज़ी ग्रेड चुनें (कम ग्रेड पर सस्ता भाव)',
      freshFromFarmer: 'उत्पादक किसान',
      distanceAway: 'किमी दूर',
      organicBadge: 'जैविक / प्राकृतिक',
      kisanId: 'किसान आईडी',
      addToCart: 'थैले में जोड़ें',
      added: 'जोड़ा गया',
      viewCart: 'थैला देखें',
      emptyCart: 'आपका थैला खाली है। खेत की ताज़ी सब्ज़ियाँ चुनें!',
      cartSummary: 'ऑर्डर का विवरण',
      orderType: 'ऑर्डर का प्रकार',
      regularOrder: 'दैनिक घरेलू ऑर्डर',
      regularOrderDesc: 'संपूर्ण इलाके के लिए अगले दिन सीधे खेत से ताज़ा डिलीवरी।',
      bulkOrder: 'थोक ऑर्डर (50 किलो+ या कैटरिंग/दुकान)',
      bulkOrderDesc: 'लोकल एडमिन द्वारा किसानों से आवंटित। न्यूनतम 30% टोकन अग्रिम अनिवार्य।',
      bulkNotice: 'थोक ऑर्डर नियम: कम से कम 30% टोकन अग्रिम पहले जमा करना होगा। शेष 70% डिलीवरी पर सब्ज़ी जाँचने के बाद दिया जाएगा।',
      tokenAmountTitle: 'अग्रिम टोकन भुगतान (न्यूनतम 30%)',
      tokenPercentageNotice: 'किसान के स्टॉक को आरक्षित करने हेतु यह टोकन अभी भुगतान हो रहा है।',
      tokenRemainingTitle: 'शेष भुगतान (डिलीवरी पर देय)',
      paymentMethod: 'भुगतान का तरीका चुनें',
      prepaid: 'ऑनलाइन भुगतान (UPI / PhonePe / GPay)',
      prepaidDesc: 'सुरक्षित डिजिटल भुगतान',
      cod: 'कैश ऑन डिलीवरी (COD)',
      codDesc: 'सब्ज़ी मिलने पर राइडर को नकद या UPI दें',
      checkoutBtn: 'सीधे किसान से ऑर्डर करें',
      placingOrder: 'ऑर्डर दर्ज हो रहा है...',
      orderSuccess: 'ऑर्डर सफलतापूर्वक दर्ज! स्थानीय मंडी एडमिन द्वारा सत्यापित।',
      trackOrder: 'लाइव ट्रैकिंग देखें',
      customerCareBtn: 'स्थानीय कस्टमर केयर डेस्क',
      customerCareTitle: 'कस्टमर केयर (लोकल एडमिन से सीधा संपर्क)',
      chatWithAdmin: 'सब्ज़ी की गुणवत्ता, रिफंड या पूछताछ के लिए सीधे अपने लोकल मंडी अधिकारी से बात करें।',
      typeMessage: 'अपना संदेश या शिकायत यहाँ लिखें...',
      send: 'भेजें',
      myOrders: 'मेरे ऑर्डर',
      liveTracker: 'मंडी से घर तक लाइव ट्रैकिंग',
      currentStage: 'वर्तमान स्थिति',
      orderNumber: 'ऑर्डर संख्या',
      farmerOrigin: 'किसान की जानकारी',
    },
    admin: {
      title: 'लोकल मंडी हब एडमिन पोर्टल',
      subTitle: 'क्षेत्रीय अधिकारी: रामेश्वर पटेल (सीहोर ग्रामीण तहसील केंद्र)',
      localOfficer: 'स्थानीय मंडी अधिकारी',
      mandiHub: 'केंद्र: सीहोर किसान केंद्र #04',
      tabs: {
        farmers: 'किसान व सत्यापन',
        stockQuality: 'स्टॉक व ग्रेडिंग',
        bulkAllocations: 'थोक ऑर्डर व आवंटन',
        customerCare: 'कस्टमर केयर डेस्क',
      },
      farmerManagement: 'क्षेत्रीय किसानों का पंजीकरण एवं सत्यापन',
      addFarmer: 'नया किसान जोड़ें',
      verifyStatus: 'सत्यापन स्थिति',
      verifyFarmerBtn: 'खेत व साख सत्यापित करें',
      verifiedSuccess: 'किसान को आधिकारिक बिक्री हेतु सत्यापित कर दिया गया।',
      stockAndGrading: 'आवक स्टॉक एवं गुणवत्ता परीक्षण',
      gradePricingRule: 'ग्रेड मूल्य नियम: ग्रेड A मूल भाव, ग्रेड B पर 28% छूट, ग्रेड C पर 52% छूट।',
      qualityInspection: 'गुणवत्ता व नमी जाँच',
      inspectAndGradeBtn: 'ग्रेड व भाव अपडेट करें',
      qualityScore: 'गुणवत्ता स्कोर',
      bulkDutyTitle: 'थोक ऑर्डर: स्टॉक आवंटन व निर्णय',
      bulkDutyDesc: 'लोकल एडमिन के रूप में किसानों से स्टॉक आवंटित करें अथवा अनुपलब्धता पर ऑर्डर रद्द करें।',
      allocateStockBtn: 'स्टॉक आवंटित करें व राइडर को सौंपें',
      cancelOrderBtn: 'अनुरोध रद्द करें',
      allocatedSuccess: 'थोक ऑर्डर हेतु किसानों से कोटा सफलतापूर्वक आवंटित किया गया!',
      cancelledSuccess: 'थोक ऑर्डर रद्द किया गया एवं ग्राहक को सूचित किया गया।',
      careDeskTitle: 'कस्टमर केयर सहायता डेस्क',
      careDeskDesc: 'ग्राहकों की शिकायतों, प्रश्नों एवं रिफंड का त्वरित समाधान।',
      replyAsOfficer: 'मंडी अधिकारी के रूप में उत्तर दें',
      resolvedStatus: 'शिकायत स्थिति',
      markResolved: 'हल घोषित करें',
    },
    rider: {
      title: 'कृषिहाट डिलीवरी राइडर पोर्टल',
      dutyStatus: 'ड्यूटी पर सक्रिय',
      activeTasks: 'आवंटित पिकअप व डिलीवरी कार्य',
      todayTrips: 'आज पूरी की गई ट्रिप',
      todayEarnings: 'आज की कुल कमाई',
      pickupLocation: 'किसान संकलन केंद्र',
      deliveryLocation: 'ग्राहक का पता',
      orderType: 'ऑर्डर श्रेणी',
      paymentToCollect: 'द्वार पर भुगतान वसूली',
      alreadyPrepaid: 'ऑनलाइन भुगतान हो चुका है (वसूली ₹0)',
      collectCod: 'पूरा COD नकद प्राप्त करें',
      collectTokenBalance: 'थोक ऑर्डर का शेष 70% बैलेंस प्राप्त करें',
      actions: {
        accept: 'ऑर्डर स्वीकार करें',
        reachedFarm: 'किसान केंद्र पहुँचा',
        pickedUp: 'वज़न किया व माल उठाया',
        outForDelivery: 'डिलीवरी हेतु रवाना',
        delivered: 'डिलीवरी पूर्ण व भुगतान दर्ज',
      },
      callFarmer: 'किसान को कॉल करें',
      callCustomer: 'ग्राहक को कॉल करें',
      callAdmin: 'लोकल एडमिन को कॉल करें',
    },
    farmerPanel: {
      title: 'किसान डैशबोर्ड व सहायता पैनल',
      subTitle: 'पारदर्शी ग्राहक रेटिंग, वास्तविक समीक्षाएं, 100% किसान कमाई और सीधे एडमिन सहायता।',
      switchFarmer: 'किसान प्रोफाइल बदलें',
      tabs: {
        reviews: 'ग्राहक समीक्षाएं',
        rating: 'रेटिंग व गुणवत्ता',
        earnings: 'कमाई व भुगतान',
        support: 'लोकल एडमिन सहायता',
      },
      reviews: {
        buyerReviews: 'जाँची गई ग्राहक समीक्षाएं',
        verifiedBuyer: 'प्रमाणित मंडी खरीद',
        replyPlaceholder: 'ग्राहक को धन्यवाद या टिप्पणी लिखें...',
        sendReply: 'उत्तर भेजें',
        noReviews: 'इस फ़िल्टर के लिए कोई समीक्षा नहीं मिली।',
        filterAll: 'सभी फसलें',
      },
      rating: {
        overallScore: 'कुल मंडी रेटिंग',
        qualityScore: 'गुणवत्ता जाँच स्कोर',
        onTimeHarvest: 'समय पर कटाई कोटा पूर्ति',
        zeroRejection: 'शून्य अस्वीकृति रिकॉर्ड',
        badgesEarned: 'मंडी पदक व प्रमाण पत्र',
        ratingDistribution: 'स्टार रेटिंग विवरण',
      },
      earnings: {
        totalEarnings: 'कुल प्राप्त कमाई',
        settledAmount: 'खाते में जमा भुगतान',
        pendingAmount: 'अगली सुबह देय शेष',
        directBankNote: 'शून्य दलाली गारंटी: ग्राहक द्वारा दिया गया पूरा पैसा सीधे आपके किसान बैंक खाते में जमा होता है।',
        requestAdvance: 'तत्काल अग्रिम भुगतान का अनुरोध करें',
        advanceSuccess: 'अग्रिम भुगतान अनुरोध स्वीकृत! राशि आपके खाते में अंतरित कर दी गई है।',
        transactionHistory: 'बिक्री व भुगतान खाता बही',
        quantity: 'बिक्री मात्रा',
        rate: 'भाव/किग्रा',
        status: 'स्थिति',
      },
      support: {
        officerTitle: 'लोकल मंडी अधिकारी',
        officerName: 'रामेश्वर पटेल (सीहोर ग्रामीण केंद्र)',
        officerContact: '+91 94250 11988',
        directDeskNotice: 'क्रेट्स आपूर्ति, कटाई कोटा, ग्रेडिंग जाँच व भुगतान सहायता हेतु सीधे मंडी अधिकारी से संपर्क।',
        yourTickets: 'सहायता टिकट व वार्तालाप',
        raiseTicket: 'नया सहायता अनुरोध दर्ज करें',
        subject: 'अनुरोध का विषय',
        category: 'सहायता श्रेणी',
        message: 'लोकल एडमिन हेतु अपनी समस्या या आवश्यकता लिखें...',
        submit: 'अनुरोध भेजें',
        replyAsFarmer: 'एडमिन को उत्तर लिखें...',
        send: 'उत्तर भेजें',
      },
    },
    forecasting: {
      tabTitle: 'AI मांग पूर्वानुमान',
      badge: 'जेमिनी AI विश्लेषण',
      title: 'AI क्षेत्रीय मांग पूर्वानुमान व कटाई कोटा',
      subtitle: 'सीहोर क्षेत्र के लिए कल सुबह आलू, चावल, प्याज और गेहूं की मांग का सटीक पूर्वानुमान। बिना किसी बर्बादी के किसानों को स्वचालित कटाई कोटा आवंटन।',
      runForecastBtn: 'AI मांग सिमुलेशन चलाएं',
      runningAi: 'जेमिनी द्वारा सीहोर मंडी डेटा का विश्लेषण जारी...',
      confidence: 'सटीकता स्कोर',
      tomorrowDemand: 'अगले दिन की स्थानीय मांग',
      cropBreakdown: 'फसल मांग बनाम मंडी स्टॉक',
      quotaAllocation: 'किसान कटाई कोटा आवंटन',
      allocateQuotaBtn: 'सुबह का कटाई कोटा आवंटित करें',
      quotaAllocated: 'किसान डेस्क को कोटा प्रेषित',
      urgencyHigh: 'उच्च मांग वृद्धि',
      urgencyCritical: 'स्टॉक कमी चेतावनी',
      urgencyNormal: 'संतुलित आपूर्ति',
      currentStock: 'वर्तमान मंडी स्टॉक',
      predictedDemand: 'अनुमानित मांग',
      deficit: 'अपेक्षित कमी',
      weatherImpact: 'मौसम व कृषि प्रभाव',
      strategicAdvisories: 'मंडी आर्थिक रणनीतिक निर्देश',
      filterWeather: 'मौसम की स्थिति',
      filterEvent: 'क्षेत्रीय आयोजन संदर्भ',
      filterTimeframe: 'समय सीमा',
    },
    chooseSide: {
      brandTagline: 'सीधा • त्वरित • ताज़ा',
      zeroMiddlemen: 'बिचौलिया-मुक्त सीधा मंडी नेटवर्क',
      subtitle: 'आगे बढ़ने के लिए अपना पोर्टल चुनें',
      farmerLabel: 'मैं किसान हूँ',
      farmerDesc: 'फसलें, दैनिक कटाई कोटा, मूल्य निर्धारण व मंडी भुगतान',
      adminLabel: 'मैं एडमिन हूँ',
      adminDesc: 'मंडी हब आवंटन, जेमिनी एआई मांग पूर्वानुमान व निगरानी',
      buyerLabel: 'मैं ग्राहक हूँ',
      buyerDesc: 'सीधा खेत से ताज़ा बाज़ार, ग्रेड A/B/C व खरीदारी',
      riderLabel: 'मैं डिलीवरी राइडर हूँ',
      riderDesc: 'इलेक्ट्रिक वैन फ्लीट, मार्ग, पिकअप व सुरक्षित डिलीवरी',
    },
    login: {
      farmerTitle: 'किसान मंडी पोर्टल',
      farmerSubtitle: 'अपने पंजीकृत किसान फ़ोन नंबर और पासवर्ड से प्रवेश करें',
      adminTitle: 'एडमिन मंडी हब',
      adminSubtitle: 'अपने मंडी अधिकारी क्रेडेंशियल्स के साथ प्रवेश करें',
      riderTitle: 'डिलीवरी फ्लीट पोर्टल',
      riderSubtitle: 'अपने ड्राइवर फ़ोन नंबर और पासवर्ड से प्रवेश करें',
      phoneLabel: 'मोबाइल फ़ोन नंबर',
      adminIdLabel: 'एडमिन फ़ोन / आईडी',
      passwordLabel: 'पासवर्ड',
      enterPhone: 'पंजीकृत मोबाइल नंबर दर्ज करें',
      enterAdminId: 'अधिकारी फ़ोन या एडमिन आईडी दर्ज करें',
      enterPassword: 'अकाउंट पासवर्ड दर्ज करें',
      signIn: 'पोर्टल में प्रवेश करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      backToSelect: 'पोर्टल चयन पर वापस जाएँ',
      demoCredentials: 'डेमो लॉगिन जानकारी',
      passwordNotice: 'राज्य कृषि उपज मंडी बोर्ड द्वारा अधिकृत पोर्टल।',
    },
    header: {
      mandiDirect: 'सीधा मंडी',
      directFarmToFork: '100% सीधा खेत से थाली तक',
      active: 'सक्रिय:',
      switchPortal: 'पोर्टल बदलें',
      logout: 'लॉग आउट',
      roles: {
        buyer: 'ग्राहक',
        farmer: 'किसान',
        admin: 'एडमिन हब',
        rider: 'राइडर',
      },
    },
    farmerDesk: {
      heroTitle: 'किसान मंडी डेस्क',
      kisanId: 'किसान आईडी',
      organicBadge: 'जैविक प्रमाणित',
      village: 'गाँव',
      distance: 'मंडी की दूरी',
      phone: 'फ़ोन',
      cropsSown: 'बोई गई फसलें',
      rating: 'रेटिंग',
      settled: 'प्राप्त भुगतान',
      escrow: 'एस्क्रो शेष',
      switchFarmer: 'किसान बदलें',
      loggedInAs: 'किसान के रूप में लॉग इन',
      tabs: {
        reviews: 'ग्राहक समीक्षा व रेटिंग',
        stock: 'मेरी कटाई का स्टॉक व ग्रेडिंग',
        earnings: 'कमाई व बैंक भुगतान',
        support: 'लोकल एडमिन मंडी सहायता',
        quota: 'एआई कोटा व कल की कटाई',
      },
    },
    clientExtra: {
      noticeOnGrades: 'ग्रेड पर विशेष सूचना:',
      fairMandiTariff: 'उचित मंडी टैरिफ',
      lowerGradeCheaper: 'कम ग्रेड = अधिक सस्ता दाम',
      activeRate: 'सक्रिय दर',
      recentOrders: 'हाल के सीधे खेत के ऑर्डर',
      close: 'बंद करें',
      categories: {
        all: 'सभी',
        staples: 'आलू व प्याज',
        grains: 'चावल व गेहूँ',
        leafy: 'हरी पत्तेदार सब्जियाँ',
        gourds: 'लौकी व कद्दू',
        beans: 'फलियाँ व दालें',
        root: 'जड़ वाली सब्जियाँ',
      },
    },
  },
  bn: {
    appName: 'কৃষিহাট',
    tagline: 'সরাসরি কৃষকের কাছ থেকে তাজা সবজি - কোনো দালাল নেই',
    directMotto: '১০০% অর্থ সরাসরি স্থানীয় কৃষকের হাতে। ন্যায্য মান্ডির দর ও যাচাইকৃত মান।',
    viewSwitch: {
      client: 'গ্রাহক স্টোর',
      admin: 'স্থানীয় অ্যাডমিন হাব',
      rider: 'ডেলিভারি রাইডার',
      farmer: 'কৃষক সহায়তা ডেস্ক',
      clientSub: 'সবজি ও কৃষক বেছে নিয়ে অর্ডার করুন',
      adminSub: 'কৃষক ভেরিফিকেশন, স্টক ও সহায়তা',
      riderSub: 'পিকআপ, ডেলিভারি ও পেমেন্ট সংগ্রহ',
      farmerSub: 'ফসলের স্টক, রিভিউ, পেমেন্ট ও কোটা',
    },
    common: {
      search: 'টাটকা সবজি খুঁজুন (আলু, টমেটো, পালং, ফুলকপি...)',
      all: 'সব',
      kg: 'কেজি',
      rupees: '₹',
      viewDetails: 'বিস্তারিত দেখুন',
      close: 'বন্ধ করুন',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      confirm: 'নিশ্চিত করুন',
      status: 'অবস্থা',
      total: 'মোট',
      date: 'তারিখ',
      phone: 'ফোন',
      address: 'ঠিকানা',
      action: 'পদক্ষেপ',
      language: 'ভাষা',
      live: 'লাইভ',
      verified: 'যাচাইকৃত কৃষক',
      unverified: 'অপেক্ষমাণ',
      success: 'সফল',
    },
    grades: {
      title: 'সবজির মান অনুযায়ী গ্রেড',
      ruleHint: 'সরকারি নিয়ম: সবজির গ্রেড যত নিচে, দাম ততটাই সস্তা।',
      gradeA: 'গ্রেড A - প্রিমিয়াম কোয়ালিটি',
      gradeADesc: 'একদম নিখুঁত আকার, কোনো দাগ নেই, দীর্ঘস্থায়ী সতেজতা।',
      gradeB: 'গ্রেড B - স্ট্যান্ডার্ড কোয়ালিটি',
      gradeBDesc: 'খামার থেকে তাজা তোলা, সামান্য অমিল আকার, দৈনন্দিন রান্নার জন্য শ্রেষ্ঠ।',
      gradeC: 'গ্রেড C - সাশ্রয়ী / প্রক্রিয়াকরণ গ্রেড',
      gradeCDesc: 'ছোট বা অসমান আকার, সবচেয়ে সস্তা দর, হোটেল ও গ্রেভির জন্য সেরা।',
    },
    client: {
      title: 'সরাসরি কৃষক বাজার',
      deliveryPromise: 'সমগ্র এলাকায় পরের দিন সকালে (সকাল ৭টা - ১১টা) সরাসরি তাজা ডেলিভারি',
      chooseFarmerTitle: 'আপনার পছন্দের কৃষক বেছে নিন',
      chooseGradeTitle: 'সবজির গ্রেড বেছে নিন (নিচের গ্রেডে দাম সস্তা)',
      freshFromFarmer: 'উৎপাদক কৃষক',
      distanceAway: 'কিমি দূরে',
      organicBadge: 'প্রাকৃতিক / জৈব',
      kisanId: 'কৃষক আইডি',
      addToCart: 'ঝুড়িতে যোগ করুন',
      added: 'যোগ করা হয়েছে',
      viewCart: 'ঝুড়ি দেখুন',
      emptyCart: 'আপনার ঝুড়ি খালি। টাটকা সবজি বেছে নিন!',
      cartSummary: 'অর্ডারের বিবরণ',
      orderType: 'অর্ডারের ধরণ',
      regularOrder: 'নিয়মিত গৃহস্থালি অর্ডার',
      regularOrderDesc: 'সমগ্র এলাকার জন্য পরের দিন সরাসরি খামার থেকে তাজা ডেলিভারি।',
      bulkOrder: 'পাইকারি / বাল্ক অর্ডার (৫০ কেজি+ বা ক্যাটারিং)',
      bulkOrderDesc: 'স্থানীয় অ্যাডমিন দ্বারা বরাদ্দ। কমপক্ষে ৩০% অগ্রিম টোকেন বাধ্যতামূলক।',
      bulkNotice: 'বাল্ক অর্ডারের নিয়ম: কমপক্ষে ৩০% অগ্রিম টোকেন মানি আগে প্রদান করতে হবে। বাকি ৭০% ডেলিভারির সময় পরিশোধযোগ্য।',
      tokenAmountTitle: 'অগ্রিম টোকেন পেমেন্ট (কমপক্ষে ৩০%)',
      tokenPercentageNotice: 'কৃষকের ফসল বুক করার জন্য এই টোকেন অর্থ এখনই পরিশোধ হচ্ছে।',
      tokenRemainingTitle: 'বাকি অর্থ (ডেলিভারির সময় দিতে হবে)',
      paymentMethod: 'পেমেন্ট পদ্ধতি বেছে নিন',
      prepaid: 'অনলাইন পেমেন্ট (UPI / GPay / NetBanking)',
      prepaidDesc: 'নিরাপদ ডিজিটাল পরিশোধ',
      cod: 'ক্যাশ অন ডেলিভারি (COD)',
      codDesc: 'সবজি বুঝে পেয়ে রাইডারকে নগদ বা UPI দিন',
      checkoutBtn: 'সরাসরি কৃষকের থেকে অর্ডার করুন',
      placingOrder: 'অর্ডার প্রস্তুত হচ্ছে...',
      orderSuccess: 'অর্ডার সফলভাবে নেওয়া হয়েছে! স্থানীয় অ্যাডমিন দ্বারা যাচাইকৃত।',
      trackOrder: 'লাইভ ট্র্যাকিং',
      customerCareBtn: 'স্থানীয় কাস্টমার কেয়ার',
      customerCareTitle: 'কাস্টমার কেয়ার (স্থানীয় অ্যাডমিনের সাথে চ্যাট)',
      chatWithAdmin: 'যেকোনো জিজ্ঞাসা, ফসলের মান বা রিফান্ডের জন্য সরাসরি স্থানীয় মান্ডি কর্মকর্তার সাথে কথা বলুন।',
      typeMessage: 'আপনার বার্তা বা অভিযোগ লিখুন...',
      send: 'পাঠান',
      myOrders: 'আমার অর্ডার',
      liveTracker: 'মান্ডি থেকে বাড়ি পর্যন্ত লাইভ ট্র্যাকিং',
      currentStage: 'বর্তমান ধাপ',
      orderNumber: 'অর্ডার নং',
      farmerOrigin: 'কৃষকের বিস্তারিত',
    },
    admin: {
      title: 'স্থানীয় মান্ডি হাব অ্যাডমিন পোর্টাল',
      subTitle: 'স্থানীয় কর্মকর্তা: রামেশ্বর প্যাটেল (সিহোর গ্রামীণ হাব)',
      localOfficer: 'স্থানীয় মান্ডি অফিসার',
      mandiHub: 'হাব: সিহোর কিষাণ কেন্দ্র #০৪',
      tabs: {
        farmers: 'কৃষক ও যাচাইকরণ',
        stockQuality: 'স্টক ও গ্রেডিং মান',
        bulkAllocations: 'বাল্ক অর্ডার ও বরাদ্দ',
        customerCare: 'কাস্টমার কেয়ার হেল্পডেস্ক',
      },
      farmerManagement: 'স্থানীয় কৃষক নথিভুক্তি ও যাচাইকরণ',
      addFarmer: 'নতুন কৃষক যুক্ত করুন',
      verifyStatus: 'যাচাই অবস্থা',
      verifyFarmerBtn: 'খামার ও কৃষক যাচাই করুন',
      verifiedSuccess: 'কৃষককে আনুষ্ঠানিকভাবে বিক্রির জন্য অনুমোদন দেওয়া হলো।',
      stockAndGrading: 'ফসল স্টক ও মান পরীক্ষা',
      gradePricingRule: 'গ্রেড মূল্য নিয়ম: গ্রেড A আসল দর, গ্রেড B তে ২৮% ছাড়, গ্রেড C তে ৫২% ছাড়।',
      qualityInspection: 'গুণমান ও আর্দ্রতা পরীক্ষা',
      inspectAndGradeBtn: 'গ্রেড ও মূল্য আপডেট করুন',
      qualityScore: 'কোয়ালিটি স্কোর',
      bulkDutyTitle: 'বাল্ক অর্ডার স্টক বরাদ্দ ও সিদ্ধান্ত',
      bulkDutyDesc: 'স্থানীয় অ্যাডমিন হিসেবে একাধিক কৃষকের থেকে স্টক বণ্টন করুন বা অনুপলব্ধ হলে বাতিল করুন।',
      allocateStockBtn: 'স্টক বরাদ্দ করুন ও রাইডারে পাঠান',
      cancelOrderBtn: 'অর্ডার বাতিল করুন',
      allocatedSuccess: 'বাল্ক অর্ডারের স্টক সফলভাবে বণ্টন করা হয়েছে!',
      cancelledSuccess: 'বাল্ক অর্ডার বাতিল করা হলো এবং ক্রেতাকে জানানো হলো।',
      careDeskTitle: 'স্থানীয় কাস্টমার কেয়ার সাপোর্ট',
      careDeskDesc: 'স্থানীয় ক্রেতাদের সমস্যা, অভিযোগ ও রিফান্ডের দ্রুত নিষ্পত্তি।',
      replyAsOfficer: 'মান্ডি অফিসার হিসেবে উত্তর দিন',
      resolvedStatus: 'টিকিট স্থিতি',
      markResolved: 'মীমাংসিত হিসেবে চিহ্নিত করুন',
    },
    rider: {
      title: 'কৃষিহাট ডেলিভারি রাইডার অ্যাপ',
      dutyStatus: 'ডিউটিতে সক্রিয়',
      activeTasks: 'বরাদ্দকৃত পিকআপ ও ডেলিভারি',
      todayTrips: 'আজকের সম্পন্ন ট্রিপ',
      todayEarnings: 'আজকের মোট আয়',
      pickupLocation: 'কৃষকের সংগ্রহ কেন্দ্র',
      deliveryLocation: 'গ্রাহকের ঠিকানা',
      orderType: 'অর্ডারের ধরণ',
      paymentToCollect: 'গ্রাহকের কাছ থেকে অর্থ সংগ্রহ',
      alreadyPrepaid: 'অনলাইন পেমেন্ট সম্পন্ন (সংগ্রহ ₹০)',
      collectCod: 'সম্পূর্ণ COD নগদ গ্রহণ করুন',
      collectTokenBalance: 'বাল্ক অর্ডারের বাকি ৭০% গ্রহণ করুন',
      actions: {
        accept: 'অর্ডার গ্রহণ করুন',
        reachedFarm: 'কৃষক কেন্দ্রে পৌঁছেছি',
        pickedUp: 'ওজন যাচাই করে মাল তুলেছি',
        outForDelivery: 'ডেলিভারির উদ্দেশ্যে রওনা',
        delivered: 'ডেলিভারি সম্পন্ন ও ক্যাশ নিশ্চিত',
      },
      callFarmer: 'কৃষককে কল করুন',
      callCustomer: 'গ্রাহককে কল করুন',
      callAdmin: 'অ্যাডমিনকে কল করুন',
    },
    farmerPanel: {
      title: 'কৃষক ড্যাশবোর্ড ও সহায়তা প্যানেল',
      subTitle: 'স্বচ্ছ ক্রেতার মতামত, রেটিং, সম্পূর্ণ কৃষক উপার্জন ও সরাসরি অ্যাডমিন সহায়তা।',
      switchFarmer: 'কৃষক নির্বাচন করুন',
      tabs: {
        reviews: 'ক্রেতার মতামত',
        rating: 'রেটিং ও মান',
        earnings: 'উপার্জন ও পেমেন্ট',
        support: 'অ্যাডমিন সহায়তা ডেস্ক',
      },
      reviews: {
        buyerReviews: 'যাচাইকৃত ক্রেতার পর্যালোচনা',
        verifiedBuyer: 'প্রমাণিত মান্ডি ক্রয়',
        replyPlaceholder: 'ক্রেতাকে ধন্যবাদ বা মন্তব্য লিখুন...',
        sendReply: 'উত্তর দিন',
        noReviews: 'কোনো পর্যালোচনা পাওয়া যায়নি।',
        filterAll: 'সকল ফসল',
      },
      rating: {
        overallScore: 'সার্বিক মান্ডি রেটিং',
        qualityScore: 'মান পরিদর্শন স্কোর',
        onTimeHarvest: 'সময়ে ফসল সংগ্রহের হার',
        zeroRejection: 'জিরো রিজেকশন রেকর্ড',
        badgesEarned: 'অর্জন ও সার্টিফিকেশন',
        ratingDistribution: 'স্টার রেটিং বিশ্লেষণ',
      },
      earnings: {
        totalEarnings: 'মোট মান্ডি উপার্জন',
        settledAmount: 'ব্যাংক অ্যাকাউন্টে জমা',
        pendingAmount: 'প্রক্রিয়াধীন পাওনা',
        directBankNote: 'শূন্য মধ্যস্থতাকারী গ্যারান্টি: গ্রাহকের সম্পূর্ণ অর্থ সরাসরি আপনার কৃষক ব্যাংক অ্যাকাউন্টে জমা হয়।',
        requestAdvance: 'তাত্ক্ষণিক অগ্রিম পেমেন্টের অনুরোধ',
        advanceSuccess: 'পেমেন্টের অনুরোধ অনুমোদিত হয়েছে!',
        transactionHistory: 'বিক্রয় ও পেমেন্ট লেজার',
        quantity: 'পরিমাণ',
        rate: 'দর/কেজি',
        status: 'অবস্থা',
      },
      support: {
        officerTitle: 'স্থানীয় মান্ডি কর্মকর্তা',
        officerName: 'রামেশ্বর প্যাটেল (সেহোর গ্রামীণ কেন্দ্র)',
        officerContact: '+91 94250 11988',
        directDeskNotice: 'ক্রেট সরবরাহ, ফসল কোটা ও পেমেন্ট সংক্রান্ত বিষয়ে সরাসরি সহায়তা।',
        yourTickets: 'সহায়তা জিজ্ঞাসা ও টিকিট',
        raiseTicket: 'নতুন সহায়তা অনুরোধ খুলুন',
        subject: 'অনুরোধের বিষয়',
        category: 'বিষয়শ্রেণী',
        message: 'আপনার সমস্যা বা প্রয়োজনীয়তা লিখুন...',
        submit: 'অনুরোধ জমা দিন',
        replyAsFarmer: 'অ্যাডমিনের উদ্দেশ্যে বার্তা লিখুন...',
        send: 'পাঠান',
      },
    },
    forecasting: {
      tabTitle: 'AI চাহিদা পূর্বাভাস',
      badge: 'জেমিনাই AI বিশ্লেষণ',
      title: 'AI এলাকাভিত্তিক চাহিদা পূর্বাভাস ও ফসল কোটা',
      subtitle: 'সিহোর এলাকার জন্য কাল সকালের আলু, চাল, পেঁয়াজ ও গমের নিখুঁত চাহিদা পূর্বাভাস। কোনো অপচয় ছাড়াই কৃষকদের স্বয়ংক্রিয় ফসল কোটা বরাদ্দ।',
      runForecastBtn: 'AI চাহিদা সিমুলেশন চালান',
      runningAi: 'জেমিনাই দ্বারা মান্ডি তথ্যের বিশ্লেষণ চলছে...',
      confidence: 'নির্ভুলতা স্কোর',
      tomorrowDemand: 'পরবর্তী দিনের স্থানীয় চাহিদা',
      cropBreakdown: 'ফসল চাহিদা বনাম মজুদ বিশ্লেষণ',
      quotaAllocation: 'কৃষক ফসল কোটা বরাদ্দ',
      allocateQuotaBtn: 'সকালের ফসল কোটা বরাদ্দ করুন',
      quotaAllocated: 'কৃষক ডেস্কে কোটা পাঠানো হয়েছে',
      urgencyHigh: 'উচ্চ চাহিদা বৃদ্ধি',
      urgencyCritical: 'মজুদ ঘাটতি সতর্কতা',
      urgencyNormal: 'ভারসাম্যপূর্ণ সরবরাহ',
      currentStock: 'বর্তমান মান্ডি মজুদ',
      predictedDemand: 'পূর্বাভাসিত চাহিদা',
      deficit: 'প্রত্যাশিত ঘাটতি',
      weatherImpact: 'আবহাওয়া ও কৃষি প্রভাব',
      strategicAdvisories: 'মান্ডি অর্থনৈতিক কৌশলগত নির্দেশিকা',
      filterWeather: 'আবহাওয়ার অবস্থা',
      filterEvent: 'স্থানীয় অনুষ্ঠানের প্রেক্ষাপট',
      filterTimeframe: 'সময়সীমা',
    },
    chooseSide: {
      brandTagline: 'সরাসরি • দ্রুত • তাজা',
      zeroMiddlemen: 'দালালমুক্ত সরাসরি মান্ডি নেটওয়ার্ক',
      subtitle: 'এগিয়ে যেতে আপনার পোর্টাল নির্বাচন করুন',
      farmerLabel: 'আমি কৃষক',
      farmerDesc: 'ফসল, দৈনিক ফসল সংগ্রহ কোটা, মূল্য নির্ধারণ ও মান্ডি অর্থপ্রদান',
      adminLabel: 'আমি অ্যাডমিন',
      adminDesc: 'মান্ডি হাব বরাদ্দ, জেমিনি এআই পূর্বাভাস ও তদারকি',
      buyerLabel: 'আমি ক্রেতা',
      buyerDesc: 'সরাসরি খামার থেকে তাজা স্টোর, গ্রেড A/B/C ও কেনাকাটা',
      riderLabel: 'আমি ডেলিভারি করি',
      riderDesc: 'ইলেকট্রিক ভ্যান বহর, রুট, পিকআপ ও নিরাপদ ডেলিভারি',
    },
    login: {
      farmerTitle: 'কৃষক মান্ডি পোর্টাল',
      farmerSubtitle: 'আপনার নিবন্ধিত কৃষক ফোন নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন',
      adminTitle: 'অ্যাডমিন মান্ডি হাব',
      adminSubtitle: 'আপনার মান্ডি অফিসার ক্রেডেনশিয়াল দিয়ে লগইন করুন',
      riderTitle: 'ডেলিভারি বহর পোর্টাল',
      riderSubtitle: 'আপনার চালক ফোন নম্বর ও পিন দিয়ে প্রবেশ করুন',
      phoneLabel: 'মোবাইল ফোন নম্বর',
      adminIdLabel: 'অ্যাডমিন ফোন / আইডি',
      passwordLabel: 'পাসওয়ার্ড',
      enterPhone: 'নিবন্ধিত মোবাইল নম্বর দিন',
      enterAdminId: 'অফিসার ফোন বা অ্যাডমিন আইডি দিন',
      enterPassword: 'অ্যাকাউন্টের পাসওয়ার্ড লিখুন',
      signIn: 'পোর্টালে প্রবেশ করুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      backToSelect: 'ভূমিকা নির্বাচনে ফিরে যান',
      demoCredentials: 'ডেমো লগইন বিবরণ',
      passwordNotice: 'রাজ্য কৃষি মান্ডি বোর্ড কর্তৃক অনুমোদিত পোর্টাল।',
    },
    header: {
      mandiDirect: 'সরাসরি মান্ডি',
      directFarmToFork: '১০০% সরাসরি খামার থেকে ঘরে',
      active: 'সক্রিয়:',
      switchPortal: 'পোর্টাল পরিবর্তন',
      logout: 'লগ আউট',
      roles: {
        buyer: 'ক্রেতা',
        farmer: 'কৃষক',
        admin: 'অ্যাডমিন হাব',
        rider: 'রাইডার',
      },
    },
    farmerDesk: {
      heroTitle: 'কৃষক মান্ডি ডেস্ক',
      kisanId: 'কিষাণ আইডি',
      organicBadge: 'জৈব প্রত্যয়িত',
      village: 'গ্রাম',
      distance: 'মান্ডির দূরত্ব',
      phone: 'ফোন',
      cropsSown: 'বপনকৃত ফসল',
      rating: 'রেটিং',
      settled: 'পরিশোধিত অর্থ',
      escrow: 'এসক্রো ব্যালেন্স',
      switchFarmer: 'কৃষক পরিবর্তন',
      loggedInAs: 'কৃষਕ হিসেবে লগইন',
      tabs: {
        reviews: 'গ্রাহক পর্যালোচনা ও রেটিং',
        stock: 'আমার ফসল মজুদ ও গ্রেডিং',
        earnings: 'উপার্জন ও ব্যাংক অর্থপ্রদান',
        support: 'স্থানীয় অ্যাডমিন মান্ডি সহায়তা',
        quota: 'এআই কোটা ও আগামীকালের সংগ্রহ',
      },
    },
    clientExtra: {
      noticeOnGrades: 'গ্রেড সংক্রান্ত বিজ্ঞপ্তি:',
      fairMandiTariff: 'ন্যায্য মান্ডি ট্যারিফ',
      lowerGradeCheaper: 'কম গ্রেড = সস্তা দাম',
      activeRate: 'বর্তমান দর',
      recentOrders: 'সাম্প্রতিক সরাসরি খামার অর্ডার',
      close: 'বন্ধ করুন',
      categories: {
        all: 'সকল',
        staples: 'আলু ও পেঁয়াজ',
        grains: 'চাল ও গম',
        leafy: 'শাকসবজি',
        gourds: 'লাউ ও কুমড়ো',
        beans: 'শিম ও ডাল',
        root: 'মূলজাতীয় সবজি',
      },
    },
  },
  mr: {
    appName: 'कृषिहाट',
    tagline: 'थेट शेतकऱ्यांकडून ताजी भाजीपाला - कोणताही मध्यस्थ नाही',
    directMotto: '१००% मोबदला थेट स्थानिक शेतकऱ्याला. रास्त बाजारभाव आणि खात्रीशीर दर्जा.',
    viewSwitch: {
      client: 'ग्राहक पोर्टल',
      admin: 'स्थानिक ॲडमिन हब',
      rider: 'डिलिव्हरी रायडर',
      farmer: 'शेतकरी मदत कक्ष',
      clientSub: 'भाजी निवडा, शेतकरी निवडा व ऑर्डर करा',
      adminSub: 'शेतकरी पडताळणी, साठा, प्रतवारी व तक्रार निवारण',
      riderSub: 'पिकअप, डिलिव्हरी व रोख रक्कम',
      farmerSub: 'शेतमाल साठा, अभिप्राय, पेआउट व कोटा',
    },
    common: {
      search: 'शेतातील ताजा भाजीपाला शोधा (बटाटा, टोमॅटो, पालक, कांदा...)',
      all: 'सर्व',
      kg: 'किलो',
      rupees: '₹',
      viewDetails: 'तपशील पहा',
      close: 'बंद करा',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      confirm: 'निश्चित करा',
      status: 'स्थिती',
      total: 'एकूण',
      date: 'तारीख',
      phone: 'फोन',
      address: 'पत्ता',
      action: 'कृती',
      language: 'भाषा',
      live: 'थेट',
      verified: 'प्रमाणित शेतकरी',
      unverified: 'पडताळणी प्रलंबित',
      success: 'यशस्वी',
    },
    grades: {
      title: 'भाजीपाला गुणवत्ता प्रत (Grades)',
      ruleHint: 'अधिकृत नियम: भाजीचा ग्रेड जितका कमी, तितकाच दर स्वस्त.',
      gradeA: 'ग्रेड A - प्रीमियम दर्जा',
      gradeADesc: 'एकसारखा आकार, निर्दोष, सर्वाधिक ताजा आणि जास्त दिवस टिकणारा.',
      gradeB: 'ग्रेड B - मानक दर्जा',
      gradeBDesc: 'शेतातून ताजी तोडणी, किंचित आकारातील बदल, दैनंदिन जेवणासाठी उत्तम.',
      gradeC: 'ग्रेड C - किफायतशीर / प्रक्रिया प्रत',
      gradeCDesc: 'लहान किंवा असमान आकार, सर्वात कमी दर, हॉटेल आणि ग्रेव्हीसाठी योग्य.',
    },
    client: {
      title: 'थेट शेतकरी बाजार',
      deliveryPromise: 'संपूर्ण परिसरात दुसऱ्या दिवशी सकाळी (सकाळी ७ - ११) थेट शेतातून घरपोच',
      chooseFarmerTitle: 'आपला शेतकरी निवडा',
      chooseGradeTitle: 'ग्रेड निवडा (कमी ग्रेडवर स्वस्त दर)',
      freshFromFarmer: 'उत्पादक शेतकरी',
      distanceAway: 'किमी अंतरावर',
      organicBadge: 'सेंद्रिय / नैसर्गिक',
      kisanId: 'किसान आयडी',
      addToCart: 'पिशवीत टाका',
      added: 'टाकले',
      viewCart: 'पिशवी पहा',
      emptyCart: 'तुमची पिशवी रिकामी आहे. ताजी भाजी निवडा!',
      cartSummary: 'ऑर्डर सारांश',
      orderType: 'ऑर्डर प्रकार',
      regularOrder: 'नियमित घरगुती ऑर्डर',
      regularOrderDesc: 'संपूर्ण परिसरासाठी दुसऱ्या दिवशी थेट शेतातून ताजी डिलिव्हरी.',
      bulkOrder: 'घाऊक / बल्क ऑर्डर (५० किलो+ किंवा कॅटरिंग)',
      bulkOrderDesc: 'स्थानिक ॲडमिनकडून वाटप. किमान ३०% टोकन रक्कम आगाऊ आवश्यक.',
      bulkNotice: 'बल्क ऑर्डर नियम: किमान ३०% टोकन रक्कम आधी भरणे अनिवार्य आहे. उर्वरित ७०% रक्कम प्रत्यक्ष भाजी तपासल्यानंतर दारात द्यायची आहे.',
      tokenAmountTitle: 'आगाऊ टोकन रक्कम (किमान ३०%)',
      tokenPercentageNotice: 'शेतकऱ्याचा साठा आरक्षित करण्यासाठी ही रक्कम आता भरली जात आहे.',
      tokenRemainingTitle: 'उर्वरित रक्कम (डिलिव्हरीवेळी देय)',
      paymentMethod: 'पेमेंट पद्धत निवडा',
      prepaid: 'ऑनलाइन पेमेंट (UPI / GPay / PhonePe)',
      prepaidDesc: 'सुरक्षित डिजिटल व्यवहार',
      cod: 'कॅश ऑन डिलिव्हरी (COD)',
      codDesc: 'माल पोहोचल्यावर रायडरला रोख किंवा UPI द्या',
      checkoutBtn: 'थेट शेतकऱ्याकडून ऑर्डर करा',
      placingOrder: 'ऑर्डर नोंदवली जात आहे...',
      orderSuccess: 'ऑर्डर यशस्वीपणे नोंदवली! स्थानिक ॲडमिनकडून तपासणी.',
      trackOrder: 'थेट ट्रॅकिंग पहा',
      customerCareBtn: 'स्थानिक ग्राहक सेवा डेस्क',
      customerCareTitle: 'ग्राहक सेवा (स्थानिक ॲडमिनशी थेट चॅट)',
      chatWithAdmin: 'कोणत्याही शंका, भाजीचा दर्जा किंवा परताव्यासाठी थेट स्थानिक अधिकाऱ्याशी बोला.',
      typeMessage: 'तुमचा संदेश किंवा तक्रार येथे लिहा...',
      send: 'पाठवा',
      myOrders: 'माझ्या ऑर्डर्स',
      liveTracker: 'शेतापासून घरापर्यंत थेट ट्रॅकिंग',
      currentStage: 'सध्याचा टप्पा',
      orderNumber: 'ऑर्डर क्र.',
      farmerOrigin: 'शेतकऱ्याची माहिती',
    },
    admin: {
      title: 'स्थानिक मंडी हब ॲडमिन पोर्टल',
      subTitle: 'स्थानिक अधिकारी: रामेश्वर पटेल (सिहोर ग्रामीण केंद्र)',
      localOfficer: 'स्थानिक मंडी अधिकारी',
      mandiHub: 'केंद्र: सिहोर किसान केंद्र #०४',
      tabs: {
        farmers: 'शेतकरी व पडताळणी',
        stockQuality: 'साठा व गुणवत्ता प्रतवारी',
        bulkAllocations: 'घाऊक ऑर्डर्स व वाटप',
        customerCare: 'ग्राहक सेवा डेस्क',
      },
      farmerManagement: 'स्थानिक शेतकरी नोंदणी व पडताळणी',
      addFarmer: 'नवीन शेतकरी जोडा',
      verifyStatus: 'पडताळणी स्थिती',
      verifyFarmerBtn: 'शेत व शेतकरी प्रमाणित करा',
      verifiedSuccess: 'शेतकऱ्याला अधिकृत विक्रीसाठी प्रमाणित केले गेले.',
      stockAndGrading: 'आवक साठा व गुणवत्ता तपासणी',
      gradePricingRule: 'ग्रेड किंमत सूत्र: ग्रेड A मूळ भाव, ग्रेड B वर २८% सवलत, ग्रेड C वर ५२% सवलत.',
      qualityInspection: 'गुणवत्ता व आर्द्रता तपासणी',
      inspectAndGradeBtn: 'ग्रेड व भाव अद्ययावत करा',
      qualityScore: 'गुणवत्ता गुण',
      bulkDutyTitle: 'घाऊक ऑर्डर साठा वाटप व निर्णय',
      bulkDutyDesc: 'स्थानिक ॲडमिन म्हणून उपलब्ध शेतकऱ्यांमधून साठा वाटप करा किंवा माल नसल्यास ऑर्डर रद्द करा.',
      allocateStockBtn: 'साठा वाटप करा व रायडरकडे पाठवा',
      cancelOrderBtn: 'मागणी रद्द करा',
      allocatedSuccess: 'घाऊक ऑर्डरसाठी शेतकऱ्यांकडून साठा यशस्वीपणे वाटप केला!',
      cancelledSuccess: 'घाऊक मागणी रद्द केली आणि ग्राहकाला कळवले.',
      careDeskTitle: 'स्थानिक ग्राहक सेवा तक्रार निवारण',
      careDeskDesc: 'स्थानिक खरेदीदारांच्या अडचणी, खराब भाजी व परताव्याचे त्वरित निवारण.',
      replyAsOfficer: 'मंडी अधिकारी म्हणून उत्तर द्या',
      resolvedStatus: 'तक्रार स्थिती',
      markResolved: 'निवारण पूर्ण घोषित करा',
    },
    rider: {
      title: 'कृषिहाट डिलिव्हरी रायडर पोर्टल',
      dutyStatus: 'ड्युटीवर कार्यरत',
      activeTasks: 'वाटप झालेले पिकअप आणि डिलिव्हरी',
      todayTrips: 'आज पूर्ण झालेल्या फेऱ्या',
      todayEarnings: 'आजची एकूण कमाई',
      pickupLocation: 'शेतकरी संकलन केंद्र',
      deliveryLocation: 'ग्राहकाचा पत्ता',
      orderType: 'ऑर्डर स्वरूप',
      paymentToCollect: 'दारावर घ्यायची रक्कम',
      alreadyPrepaid: 'ऑनलाइन पेमेंट झाले आहे (घेणे ₹०)',
      collectCod: 'पूर्ण COD रोख रक्कम घ्या',
      collectTokenBalance: 'घाऊक ऑर्डरची उर्वरित ७०% रक्कम घ्या',
      actions: {
        accept: 'ऑर्डर स्वीकारा',
        reachedFarm: 'शेतकरी केंद्रावर पोहोचलो',
        pickedUp: 'वजन तपासले व माल घेतला',
        outForDelivery: 'डिलिव्हरीसाठी निघालो',
        delivered: 'डिलिव्हरी पूर्ण व रक्कम जमा',
      },
      callFarmer: 'शेतकऱ्याला कॉल करा',
      callCustomer: 'ग्राहकाला कॉल करा',
      callAdmin: 'लोकल ॲडमिनला कॉल करा',
    },
    farmerPanel: {
      title: 'शेतकरी डॅशबोर्ड व सहाय्य पॅनेल',
      subTitle: 'पारदर्शक ग्राहक मते, शेतकरी रेटिंग, १००% थेट कमाई आणि स्थानिक ॲडमिन सहाय्यता.',
      switchFarmer: 'शेतकरी निवडा',
      tabs: {
        reviews: 'ग्राहक मते व समीक्षा',
        rating: 'रेटिंग व प्रतवारी दर्जा',
        earnings: 'कमाई व थेट देयके',
        support: 'स्थानिक ॲडमिन सहाय्य',
      },
      reviews: {
        buyerReviews: 'पडताळणी झालेली ग्राहक मते',
        verifiedBuyer: 'प्रमाणित थेट खरेदी',
        replyPlaceholder: 'ग्राहकाला धन्यवाद किंवा शेतातील माहिती लिहा...',
        sendReply: 'उत्तर पाठवा',
        noReviews: 'कोणतीही मते उपलब्ध नाहीत.',
        filterAll: 'सर्व पिके',
      },
      rating: {
        overallScore: 'एकूण बाजार समिती रेटिंग',
        qualityScore: 'दर्जा तपासणी गुण',
        onTimeHarvest: 'वेळेवर काढणी कोटा पूर्तता',
        zeroRejection: 'शून्य रिजेक्शन विक्रम',
        badgesEarned: 'सन्मान चिन्हे व प्रमाणपत्रे',
        ratingDistribution: 'स्टार रेटिंग वर्गीकरण',
      },
      earnings: {
        totalEarnings: 'एकूण झालेली कमाई',
        settledAmount: 'बँक खात्यात थेट जमा',
        pendingAmount: 'उद्या सकाळी देय शिल्लक',
        directBankNote: 'शून्य मध्यस्थ हमी: ग्राहकाने दिलेला प्रत्येक रुपया थेट तुमच्या किसान बँक खात्यात जमा होतो.',
        requestAdvance: 'तातडीच्या उचल रकमेची मागणी करा',
        advanceSuccess: 'रक्कम मंजूर झाली असून थेट खात्यात वर्ग करण्यात आली आहे.',
        transactionHistory: 'थेट विक्री व देयके खतावणी',
        quantity: 'विक्री प्रमाण',
        rate: 'दर/किलो',
        status: 'स्थिती',
      },
      support: {
        officerTitle: 'स्थानिक बाजार समिती अधिकारी',
        officerName: 'रामेश्वर पटेल (सीहोर केंद्र)',
        officerContact: '+91 94250 11988',
        directDeskNotice: 'क्रेट्स पुरवठा, काढणी कोटा, प्रतवारी दर्जा व पेमेंट संबंधित थेट सहाय्य.',
        yourTickets: 'सहाय्य तक्रारी व संभाषण',
        raiseTicket: 'नवीन सहाय्य विनंती नोंदवा',
        subject: 'विनंतीचा विषय',
        category: 'प्रवर्ग',
        message: 'लोकल ॲडमिनसाठी आपली अडचण किंवा गरज नमूद करा...',
        submit: 'विनंती सादर करा',
        replyAsFarmer: 'ॲडमिनला उत्तर लिहा...',
        send: 'पाठवा',
      },
    },
    forecasting: {
      tabTitle: 'AI मागणी अंदाज',
      badge: 'जेमिनी AI विश्लेषण',
      title: 'AI प्रादेशिक मागणी अंदाज व काढणी कोटा',
      subtitle: 'सीहोर विभागासाठी उद्या सकाळच्या बटाटे, तांदूळ, कांदा आणि गव्हाच्या मागणीचा अचूक अंदाज. शून्य अन्नाची नासाडी राखत शेतकऱ्यांना थेट सकाळचा काढणी कोटा वाटप.',
      runForecastBtn: 'AI मागणी अंदाज चालवा',
      runningAi: 'जेमिनी द्वारे सीहोर बाजार समिती माहितीचे विश्लेषण सुरू...',
      confidence: 'अचूकता गुण',
      tomorrowDemand: 'पुढील दिवसाची स्थानिक मागणी',
      cropBreakdown: 'पीक मागणी विरूद्ध साठा विश्लेषण',
      quotaAllocation: 'शेतकरी काढणी कोटा वाटप',
      allocateQuotaBtn: 'सकाळचा काढणी कोटा मंजूर करा',
      quotaAllocated: 'शेतकरी कक्षाला कोटा पाठवला',
      urgencyHigh: 'उच्च मागणी वाढ',
      urgencyCritical: 'साठा टंचाई इशारा',
      urgencyNormal: 'संतुलित पुरवठा',
      currentStock: 'सध्याचा बाजार साठा',
      predictedDemand: 'अंदाजित मागणी',
      deficit: 'अपेक्षित तुटवडा',
      weatherImpact: 'हवामान व कृषी परिणाम',
      strategicAdvisories: 'बाजार समिती आर्थिक धोरणात्मक सूचना',
      filterWeather: 'हवामानाची स्थिती',
      filterEvent: 'स्थानिक प्रसंग संदर्भ',
      filterTimeframe: 'कालावधी',
    },
    chooseSide: {
      brandTagline: 'थेट • जलद • ताजे',
      zeroMiddlemen: 'मध्यस्थ-मुक्त थेट बाजार समिती नेटवर्क',
      subtitle: 'पुढे जाण्यासाठी आपले पोर्टल निवडा',
      farmerLabel: 'मी शेतकरी आहे',
      farmerDesc: 'पिके, दैनंदिन तोडणी कोटा, दर आणि थेट बँक खात्यात मोबदला',
      adminLabel: 'मी ॲडमिन आहे',
      adminDesc: 'बाजार केंद्र वाटप, जेमिनी एआय अंदाज व व्यवस्थापन',
      buyerLabel: 'मी ग्राहक आहे',
      buyerDesc: 'थेट शेतातून घरपोच भाजीपाला, प्रतवारी A/B/C व खरेदी',
      riderLabel: 'मी डिलिव्हरी करतो',
      riderDesc: 'इलेक्ट्रिक व्हॅन ताफा, मार्ग, शेतातून उचल व ग्राहकास डिलिव्हरी',
    },
    login: {
      farmerTitle: 'शेतकरी बाजार पोर्टल',
      farmerSubtitle: 'आपल्या नोंदणीकृत शेतकरी फोन नंबर आणि पासवर्डने प्रवेश करा',
      adminTitle: 'ॲडमिन बाजार हब',
      adminSubtitle: 'आपल्या बाजार समिती अधिकारी खात्यासह प्रवेश करा',
      riderTitle: 'डिलिव्हरी ताफा पोर्टल',
      riderSubtitle: 'आपल्या ड्रायव्हर फोन नंबर आणि पासवर्डने प्रवेश करा',
      phoneLabel: 'मोबाईल फोन नंबर',
      adminIdLabel: 'ॲडमिन फोन / आयडी',
      passwordLabel: 'पासवर्ड',
      enterPhone: 'नोंदणीकृत मोबाईल नंबर टाका',
      enterAdminId: 'अधिकारी फोन किंवा ॲडमिन आयडी टाका',
      enterPassword: 'खाते पासवर्ड टाका',
      signIn: 'पोर्टलमध्ये प्रवेश करा',
      forgotPassword: 'पासवर्ड विसरलात?',
      backToSelect: 'भूमिका निवडीकडे परत जा',
      demoCredentials: 'डेमो प्रवेश माहिती',
      passwordNotice: 'राज्य कृषी पणन मंडळ अधिकृत पोर्टल.',
    },
    header: {
      mandiDirect: 'थेट बाजार',
      directFarmToFork: '१००% थेट शेतातून ताटात',
      active: 'सक्रिय:',
      switchPortal: 'पोर्टल बदला',
      logout: 'लॉग आऊट',
      roles: {
        buyer: 'ग्राहक',
        farmer: 'शेतकरी',
        admin: 'ॲडमिन हब',
        rider: 'रायडर',
      },
    },
    farmerDesk: {
      heroTitle: 'शेतकरी बाजार कक्ष',
      kisanId: 'किसान ओळखपत्र',
      organicBadge: 'सेंद्रिय प्रमाणित',
      village: 'गाव',
      distance: 'बाजाराचे अंतर',
      phone: 'फोन',
      cropsSown: 'पेरलेली पिके',
      rating: 'रेटिंग',
      settled: 'मिळालेला मोबदला',
      escrow: 'जमा शिल्लक',
      switchFarmer: 'शेतकरी बदला',
      loggedInAs: 'शेतकरी म्हणून लॉगिन',
      tabs: {
        reviews: 'ग्राहक अभिप्राय व रेटिंग',
        stock: 'माझा भाजीपाला साठा व प्रतवारी',
        earnings: 'कमाई आणि थेट बँक खात्यात मोबदला',
        support: 'स्थानिक ॲडमिन बाजार मदत कक्ष',
        quota: 'एआय कोटा व उद्याची तोडणी',
      },
    },
    clientExtra: {
      noticeOnGrades: 'प्रतवारीबाबत महत्त्वाची सूचना:',
      fairMandiTariff: 'रास्त बाजारभाव दर',
      lowerGradeCheaper: 'कमी ग्रेड = अधिक स्वस्त दर',
      activeRate: 'चालू दर',
      recentOrders: 'अलीकडील थेट शेतकरी ऑर्डर्स',
      close: 'बंद करा',
      categories: {
        all: 'सर्व',
        staples: 'बटाटा व कांदा',
        grains: 'तांदूळ व गहू',
        leafy: 'पालेभाज्या',
        gourds: 'दुधी व भोपळा',
        beans: 'शेंगा व कडधान्ये',
        root: 'कंदमुळे',
      },
    },
  },
  pa: {
    appName: 'ਕ੍ਰਿਸ਼ੀਹਾਟ',
    tagline: 'ਸਿੱਧੇ ਕਿਸਾਨਾਂ ਤੋਂ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ - ਕੋਈ ਵਿਚੋਲੀਆ ਨਹੀਂ',
    directMotto: '100% ਭੁਗਤਾਨ ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਨੂੰ। ਵਾਜਬ ਮੰਡੀ ਭਾਅ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਗੁਣਵੱਤਾ।',
    viewSwitch: {
      client: 'ਗਾਹਕ ਸਟੋਰ',
      admin: 'ਸਥਾਨਕ ਮੰਡੀ ਹੱਬ',
      rider: 'ਡਿਲੀਵਰੀ ਰਾਈਡਰ',
      farmer: 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਡੈਸਕ',
      clientSub: 'ਵੇਖੋ, ਕਿਸਾਨ ਚੁਣੋ ਅਤੇ ਆਰਡਰ ਕਰੋ',
      adminSub: 'ਕਿਸਾਨ ਪ੍ਰਮਾਣੀਕਰਨ, ਸਟਾਕ, ਗੁਣਵੱਤਾ ਤੇ ਕੇਅਰ',
      riderSub: 'ਪਿਕਅੱਪ, ਡਿਲੀਵਰੀ ਅਤੇ ਭੁਗਤਾਨ',
      farmerSub: 'ਫਸਲ ਸਟਾਕ, ਸਮੀਖਿਆਵਾਂ, ਪੇਆਊਟ ਤੇ ਕੋਟਾ',
    },
    common: {
      search: 'ਤਾਜ਼ੀਆਂ ਖੇਤੀ ਸਬਜ਼ੀਆਂ ਖੋਜੋ (ਆਲੂ, ਟਮਾਟਰ, ਪਾਲਕ...)',
      all: 'ਸਭ',
      kg: 'ਕਿਲੋ',
      rupees: '₹',
      viewDetails: 'ਵੇਰਵੇ ਵੇਖੋ',
      close: 'ਬੰਦ ਕਰੋ',
      save: 'ਸੰਭਾਲੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
      status: 'ਸਥਿਤੀ',
      total: 'ਕੁੱਲ',
      date: 'ਮਿਤੀ',
      phone: 'ਫ਼ੋਨ',
      address: 'ਪਤਾ',
      action: 'ਕਾਰਵਾਈ',
      language: 'ਭਾਸ਼ਾ',
      live: 'ਲਾਈਵ',
      verified: 'ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',
      unverified: 'ਪ੍ਰਮਾਣੀਕਰਨ ਬਾਕੀ',
      success: 'ਸਫਲ',
    },
    grades: {
      title: 'ਸਬਜ਼ੀ ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ',
      ruleHint: 'ਸਰਕਾਰੀ ਨਿਯਮ: ਜਿੰਨਾ ਨੀਵਾਂ ਗ੍ਰੇਡ, ਓਨੀ ਹੀ ਘੱਟ ਕੀਮਤ।',
      gradeA: 'ਗ੍ਰੇਡ A - ਪ੍ਰੀਮੀਅਮ',
      gradeADesc: 'ਇਕੋ ਜਿਹਾ ਆਕਾਰ, ਕੋਈ ਦਾਗ ਨਹੀਂ, ਬਿਲਕੁਲ ਤਾਜ਼ਾ ਅਤੇ ਲੰਬੀ ਸ਼ੈਲਫ-ਲਾਈਫ।',
      gradeB: 'ਗ੍ਰੇਡ B - ਸਟੈਂਡਰਡ',
      gradeBDesc: 'ਤਾਜ਼ੀ ਵਾਢੀ, ਮਾਮੂਲੀ ਬਾਹਰੀ ਫ਼ਰਕ, ਰੋਜ਼ਾਨਾ ਘਰੇਲੂ ਰਸੋਈ ਲਈ ਉੱਤਮ।',
      gradeC: 'ਗ੍ਰੇਡ C - ਕਿਫ਼ਾਇਤੀ / ਪ੍ਰੋਸੈਸਿੰਗ',
      gradeCDesc: 'ਅਸਮਾਨ ਆਕਾਰ, ਸਭ ਤੋਂ ਸਸਤਾ, ਰੈਸਟੋਰੈਂਟ ਗ੍ਰੇਵੀ, ਪਿਊਰੀ ਤੇ ਪੇਸਟ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ।',
    },
    client: {
      title: 'ਖੇਤਾਂ ਤੋਂ ਸਿੱਧੀ ਮੰਡੀ',
      deliveryPromise: 'ਅਗਲੇ ਦਿਨ ਸਵੇਰੇ ਡਿਲੀਵਰੀ (7:00 AM - 11:00 AM) ਪੂਰੇ ਇਲਾਕੇ ਵਿੱਚ',
      chooseFarmerTitle: 'ਆਪਣਾ ਕਿਸਾਨ ਚੁਣੋ',
      chooseGradeTitle: 'ਗ੍ਰੇਡ ਚੁਣੋ (ਨੀਵੇਂ ਗ੍ਰੇਡ ਉੱਤੇ ਕੀਮਤ ਸਸਤੀ)',
      freshFromFarmer: 'ਕਿਸਾਨ',
      distanceAway: 'ਕਿਲੋਮੀਟਰ ਦੂਰ',
      organicBadge: 'ਕੁਦਰਤੀ / ਜੈਵਿਕ',
      kisanId: 'ਕਿਸਾਨ ਆਈਡੀ',
      addToCart: 'ਟੋਕਰੀ ਵਿੱਚ ਪਾਓ',
      added: 'ਜੋੜਿਆ ਗਿਆ',
      viewCart: 'ਟੋਕਰੀ',
      emptyCart: 'ਤੁਹਾਡੀ ਟੋਕਰੀ ਖਾਲੀ ਹੈ। ਖੇਤ ਦੀਆਂ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਚੁਣੋ!',
      cartSummary: 'ਆਰਡਰ ਸੰਖੇਪ',
      orderType: 'ਆਰਡਰ ਦੀ ਕਿਸਮ',
      regularOrder: 'ਆਮ ਆਰਡਰ (ਘਰੇਲੂ)',
      regularOrderDesc: 'ਅਗਲੇ ਦਿਨ ਸਵੇਰੇ ਘਰ-ਘਰ ਤਾਜ਼ੀ ਵਾਢੀ ਦੀ ਡਿਲੀਵਰੀ।',
      bulkOrder: 'ਥੋਕ ਆਰਡਰ (50 ਕਿਲੋ+ ਜਾਂ ਕੈਟਰਿੰਗ/ਦੁਕਾਨਦਾਰ)',
      bulkOrderDesc: 'ਸਥਾਨਕ ਐਡਮਿਨ ਦੁਆਰਾ ਮਨਜ਼ੂਰ। ਘੱਟੋ-ਘੱਟ 30% ਪੇਸ਼ਗੀ ਟੋਕਨ ਜ਼ਰੂਰੀ।',
      bulkNotice: 'ਥੋਕ ਆਰਡਰ ਨਿਯਮ: ਘੱਟੋ-ਘੱਟ 30% ਪੇਸ਼ਗੀ ਟੋਕਨ ਰਕਮ ਪਹਿਲਾਂ ਅਦਾ ਕਰਨੀ ਲਾਜ਼ਮੀ ਹੈ। ਬਾਕੀ ਬਕਾਇਆ ਡਿਲੀਵਰੀ ਮਿਲਣ ਤੇ ਅਦਾ ਕਰੋ।',
      tokenAmountTitle: 'ਪੇਸ਼ਗੀ ਟੋਕਨ ਭੁਗਤਾਨ (ਘੱਟੋ-ਘੱਟ 30%)',
      tokenPercentageNotice: 'ਤੁਸੀਂ ਕਿਸਾਨ ਦਾ ਸਟਾਕ ਬੁੱਕ ਕਰਨ ਲਈ ਇਹ ਟੋਕਨ ਰਕਮ ਹੁਣ ਅਦਾ ਕਰ ਰਹੇ ਹੋ।',
      tokenRemainingTitle: 'ਬਾਕੀ ਬਕਾਇਆ (ਡਿਲੀਵਰੀ ਸਮੇਂ ਭੁਗਤਾਨਯੋਗ)',
      paymentMethod: 'ਭੁਗਤਾਨ ਵਿਧੀ ਚੁਣੋ',
      prepaid: 'ਪ੍ਰੀਪੇਡ (UPI / PhonePe / GPay / ਨੈੱਟਬੈਂਕਿੰਗ)',
      prepaidDesc: 'ਸੰਪਰਕ ਰਹਿਤ ਤੁਰੰਤ ਡਿਜੀਟਲ ਭੁਗਤਾਨ',
      cod: 'ਕੈਸ਼ ਆਨ ਡਿਲੀਵਰੀ (COD)',
      codDesc: 'ਸਾਮਾਨ ਪਹੁੰਚਣ ਤੇ ਰਾਈਡਰ ਨੂੰ ਨਕਦ ਜਾਂ UPI ਰਾਹੀਂ ਭੁਗਤਾਨ ਕਰੋ',
      checkoutBtn: 'ਸਿੱਧਾ ਖੇਤੀ ਆਰਡਰ ਭੇਜੋ',
      placingOrder: 'ਤੁਹਾਡਾ ਖੇਤੀ ਆਰਡਰ ਪ੍ਰਕਿਰਿਆ ਅਧੀਨ ਹੈ...',
      orderSuccess: 'ਆਰਡਰ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਹੋ ਗਿਆ! ਸਥਾਨਕ ਮੰਡੀ ਐਡਮਿਨ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ।',
      trackOrder: 'ਆਰਡਰ ਲਾਈਵ ਟਰੈਕ ਕਰੋ',
      customerCareBtn: 'ਸਥਾਨਕ ਗਾਹਕ ਸਹਾਇਤਾ ਡੈਸਕ',
      customerCareTitle: 'ਗਾਹਕ ਸਹਾਇਤਾ (ਸਿੱਧਾ ਸਥਾਨਕ ਐਡਮਿਨ ਨਾਲ)',
      chatWithAdmin: 'ਸਵਾਲਾਂ, ਰਿਫੰਡ ਜਾਂ ਕਿਸਾਨ ਫੇਰੀ ਲਈ ਆਪਣੇ ਸਥਾਨਕ ਹੱਬ ਅਧਿਕਾਰੀ ਨਾਲ ਗੱਲ ਕਰੋ।',
      typeMessage: 'ਆਪਣਾ ਸੁਨੇਹਾ ਜਾਂ ਸ਼ਿਕਾਇਤ ਲਿਖੋ...',
      send: 'ਭੇਜੋ',
      myOrders: 'ਮੇਰੇ ਆਰਡਰ',
      liveTracker: 'ਮੰਡੀ ਤੋਂ ਘਰ ਤੱਕ ਲਾਈਵ ਟਰੈਕਿੰਗ',
      currentStage: 'ਮੌਜੂਦਾ ਸਥਿਤੀ',
      orderNumber: 'ਆਰਡਰ ਨੰ.',
      farmerOrigin: 'ਸਿੱਧਾ ਕਿਸਾਨ ਮੂਲ',
    },
    admin: {
      title: 'ਸਥਾਨਕ ਮੰਡੀ ਹੱਬ ਐਡਮਿਨ ਪੋਰਟਲ',
      subTitle: 'ਸਥਾਨਕ ਕਲੱਸਟਰ ਅਧਿਕਾਰੀ: ਰਾਮੇਸ਼ਵਰ ਪਟੇਲ (ਸੀਹੋਰ ਦਿਹਾਤੀ ਤਹਿਸੀਲ ਹੱਬ)',
      localOfficer: 'ਸਥਾਨਕ ਮੰਡੀ ਅਧਿਕਾਰੀ',
      mandiHub: 'ਹੱਬ: ਸੀਹੋਰ ਕਿਸਾਨ ਕੇਂਦਰ #04',
      tabs: {
        farmers: 'ਕਿਸਾਨ ਅਤੇ ਪ੍ਰਮਾਣੀਕਰਨ',
        stockQuality: 'ਸਟਾਕ ਅਤੇ ਗੁਣਵੱਤਾ ਗ੍ਰੇਡਿੰਗ',
        bulkAllocations: 'ਥੋਕ ਆਰਡਰ ਅਤੇ ਵੰਡ',
        customerCare: 'ਗਾਹਕ ਸਹਾਇਤਾ ਡੈਸਕ',
      },
      farmerManagement: 'ਸਥਾਨਕ ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਪ੍ਰਮਾਣੀਕਰਨ',
      addFarmer: 'ਨਵਾਂ ਸਥਾਨਕ ਕਿਸਾਨ ਰਜਿਸਟਰ ਕਰੋ',
      verifyStatus: 'ਪ੍ਰਮਾਣੀਕਰਨ ਸਥਿਤੀ',
      verifyFarmerBtn: 'ਕਿਸਾਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਖੇਤ ਨਿਰੀਖਣ ਕਰੋ',
      verifiedSuccess: 'ਕਿਸਾਨ ਪ੍ਰਮਾਣਿਤ ਹੋ ਗਿਆ ਅਤੇ ਜਨਤਕ ਵਿਕਰੀ ਲਈ ਮਨਜ਼ੂਰ ਹੈ।',
      stockAndGrading: 'ਵਾਢੀ ਸਟਾਕ ਅਤੇ ਗੁਣਵੱਤਾ ਨਿਰੀਖਣ',
      gradePricingRule: 'ਗ੍ਰੇਡ ਕੀਮਤ ਫਾਰਮੂਲਾ: ਗ੍ਰੇਡ A ਬੇਸ ਕੀਮਤ ਹੈ, ਗ੍ਰੇਡ B ਲਗਭਗ 28% ਛੋਟ, ਗ੍ਰੇਡ C ਲਗਭਗ 52% ਛੋਟ ਹੈ।',
      qualityInspection: 'ਗੁਣਵੱਤਾ ਅਤੇ ਨਮੀ ਜਾਂਚ ਸੂਚੀ',
      inspectAndGradeBtn: 'ਗ੍ਰੇਡ ਅਤੇ ਕੀਮਤ ਅੱਪਡੇਟ ਕਰੋ',
      qualityScore: 'ਗੁਣਵੱਤਾ ਸਕੋਰ',
      bulkDutyTitle: 'ਥੋਕ ਆਰਡਰ ਸਟਾਕ ਵੰਡ ਅਤੇ ਫੈਸਲਾ',
      bulkDutyDesc: 'ਸਥਾਨਕ ਐਡਮਿਨ ਵਜੋਂ, ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਵਿੱਚ ਵਾਢੀ ਸਟਾਕ ਵੰਡੋ ਜਾਂ ਸਪਲਾਈ ਘੱਟ ਹੋਣ ਤੇ ਰੱਦ ਕਰੋ।',
      allocateStockBtn: 'ਸਟਾਕ ਵੰਡੋ ਅਤੇ ਰਾਈਡਰ ਨੂੰ ਭੇਜੋ',
      cancelOrderBtn: 'ਰੱਦ / ਨਾਮਨਜ਼ੂਰ ਕਰੋ',
      allocatedSuccess: 'ਥੋਕ ਕੋਟਾ ਕਿਸਾਨਾਂ ਦੇ ਸਟਾਕ ਨੂੰ ਸਫਲਤਾਪੂਰਵਕ ਵੰਡਿਆ ਗਿਆ!',
      cancelledSuccess: 'ਥੋਕ ਬੇਨਤੀ ਰੱਦ ਕੀਤੀ ਗਈ ਅਤੇ ਖਰੀਦਦਾਰ ਨੂੰ ਸੂਚਿਤ ਕਰ ਦਿੱਤਾ ਗਿਆ।',
      careDeskTitle: 'ਸਥਾਨਕ ਗਾਹਕ ਸਹਾਇਤਾ ਡੈਸਕ',
      careDeskDesc: 'ਸਥਾਨਕ ਖਰੀਦਦਾਰਾਂ, ਫਸਲ ਸ਼ਿਕਾਇਤਾਂ, ਡਿਲੀਵਰੀ ਦੇਰੀ ਅਤੇ ਮੰਡੀ ਹੱਬ ਵਿਚਕਾਰ ਸਿੱਧਾ ਰਾਬਤਾ।',
      replyAsOfficer: 'ਸਥਾਨਕ ਮੰਡੀ ਅਧਿਕਾਰੀ ਵਜੋਂ ਜਵਾਬ ਦਿਓ',
      resolvedStatus: 'ਟਿਕਟ ਸਥਿਤੀ',
      markResolved: 'ਹੱਲ ਹੋਇਆ ਮਾਰਕ ਕਰੋ',
    },
    rider: {
      title: 'ਕ੍ਰਿਸ਼ੀਹਾਟ ਡਿਲੀਵਰੀ ਰਾਈਡਰ ਐਪ',
      dutyStatus: 'ਡਿਊਟੀ ਤੇ ਹਾਜ਼ਰ',
      activeTasks: 'ਸੌਂਪੇ ਗਏ ਪਿਕਅੱਪ ਅਤੇ ਡਿਲੀਵਰੀ',
      todayTrips: 'ਅੱਜ ਪੂਰੇ ਕੀਤੇ ਗਏ ਗੇੜੇ',
      todayEarnings: 'ਅੱਜ ਦੀ ਕਮਾਈ (ਮਾਈਲੇਜ ਸਮੇਤ)',
      pickupLocation: 'ਕਿਸਾਨ ਸੰਗ੍ਰਹਿ ਕੇਂਦਰ',
      deliveryLocation: 'ਗਾਹਕ ਦਾ ਪਤਾ',
      orderType: 'ਮਾਲ ਦੀ ਕਿਸਮ',
      paymentToCollect: 'ਗਾਹਕ ਦੇ ਦਰਵਾਜ਼ੇ ਤੇ ਭੁਗਤਾਨ ਕਾਰਵਾਈ',
      alreadyPrepaid: 'ਪ੍ਰੀਪੇਡ ਆਰਡਰ - ਕੋਈ ਨਕਦੀ ਨਹੀਂ ਲੈਣੀ (₹0)',
      collectCod: 'ਪੂਰੀ COD ਰਕਮ ਇਕੱਠੀ ਕਰੋ',
      collectTokenBalance: 'ਬਾਕੀ 70% ਥੋਕ ਬਕਾਇਆ ਇਕੱਠਾ ਕਰੋ',
      actions: {
        accept: 'ਆਰਡਰ ਸਵੀਕਾਰ ਕਰੋ',
        reachedFarm: 'ਕਿਸਾਨ / ਪਿੰਡ ਹੱਬ ਪਹੁੰਚ ਗਏ',
        pickedUp: 'ਮਾਲ ਚੁੱਕਿਆ ਅਤੇ ਤੋਲਿਆ ਗਿਆ',
        outForDelivery: 'ਡਿਲੀਵਰੀ ਲਈ ਰਵਾਨਾ',
        delivered: 'ਡਿਲੀਵਰ ਹੋ ਗਿਆ ਮਾਰਕ ਕਰੋ',
      },
      callFarmer: 'ਕਿਸਾਨ ਨੂੰ ਕਾਲ ਕਰੋ',
      callCustomer: 'ਗਾਹਕ ਨੂੰ ਕਾਲ ਕਰੋ',
      callAdmin: 'ਸਥਾਨਕ ਐਡਮਿਨ (ਹੱਬ) ਨੂੰ ਕਾਲ ਕਰੋ',
    },
    farmerPanel: {
      title: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ ਅਤੇ ਸਹਾਇਤਾ',
      subTitle: 'ਪਾਰਦਰਸ਼ੀ ਮੰਡੀ ਰੇਟਿੰਗ, ਖਰੀਦਦਾਰਾਂ ਦੀ ਰਾਏ, ਬਿਨਾਂ ਵਿਚੋਲੇ ਕਮਾਈ ਅਤੇ ਤੁਰੰਤ ਐਡਮਿਨ ਸਹਾਇਤਾ ਡੈਸਕ।',
      switchFarmer: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਚੁਣੋ',
      tabs: {
        reviews: 'ਖਰੀਦਦਾਰਾਂ ਦੀ ਸਮੀਖਿਆ',
        rating: 'ਰੇਟਿੰਗ ਅਤੇ ਗੁਣਵੱਤਾ',
        earnings: 'ਕਮਾਈ ਅਤੇ ਭੁਗਤਾਨ',
        support: 'ਐਡਮਿਨ ਸਹਾਇਤਾ ਡੈਸਕ',
      },
      reviews: {
        buyerReviews: 'ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ ਸਮੀਖਿਆਵਾਂ',
        verifiedBuyer: 'ਪ੍ਰਮਾਣਿਤ ਮੰਡੀ ਖਰੀਦ',
        replyPlaceholder: 'ਧੰਨਵਾਦ ਸੰਦੇਸ਼ ਜਾਂ ਸਪੱਸ਼ਟੀਕਰਨ ਲਿਖੋ...',
        sendReply: 'ਜਵਾਬ ਭੇਜੋ',
        noReviews: 'ਇਸ ਫਿਲਟਰ ਲਈ ਕੋਈ ਸਮੀਖਿਆ ਨਹੀਂ ਮਿਲੀ।',
        filterAll: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
      },
      rating: {
        overallScore: 'ਕੁੱਲ ਮੰਡੀ ਰੇਟਿੰਗ',
        qualityScore: 'ਨਿਰੀਖਣ ਗੁਣਵੱਤਾ ਸਕੋਰ',
        onTimeHarvest: 'ਸਮੇਂ ਸਿਰ ਵਾਢੀ ਪੂਰਤੀ ਦਰ',
        zeroRejection: 'ਜ਼ੀਰੋ-ਰੱਦ ਗੁਣਵੱਤਾ ਰਿਕਾਰਡ',
        badgesEarned: 'ਬੈਜ ਅਤੇ ਮੰਡੀ ਮਾਨਤਾਵਾਂ',
        ratingDistribution: 'ਸਟਾਰ ਰੇਟਿੰਗ ਵੰਡ',
      },
      earnings: {
        totalEarnings: 'ਕੁੱਲ ਮੰਡੀ ਕਮਾਈ',
        settledAmount: 'ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਰਕਮ',
        pendingAmount: 'ਰੂਟ ਕਲੀਅਰੈਂਸ ਬਾਕੀ',
        directBankNote: '100% ਜ਼ੀਰੋ-ਕਮਿਸ਼ਨ ਗਾਰੰਟੀ: ਗਾਹਕਾਂ ਦੁਆਰਾ ਅਦਾ ਕੀਤਾ ਹਰ ਰੁਪਿਆ ਸਿੱਧਾ ਤੁਹਾਡੇ ਕਿਸਾਨ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੁੰਦਾ ਹੈ।',
        requestAdvance: 'ਤੁਰੰਤ ਪੇਸ਼ਗੀ ਭੁਗਤਾਨ ਦੀ ਬੇਨਤੀ ਕਰੋ',
        advanceSuccess: 'ਪੇਸ਼ਗੀ ਭੁਗਤਾਨ ਦੀ ਬੇਨਤੀ ਦਰਜ! ਰਕਮ ਸਿੱਧੀ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੇਜੀ ਗਈ।',
        transactionHistory: 'ਸਿੱਧਾ ਭੁਗਤਾਨ ਅਤੇ ਵਿਕਰੀ ਖਾਤਾ',
        quantity: 'ਵੇਚੀ ਗਈ ਮਾਤਰਾ',
        rate: 'ਭਾਅ/ਕਿਲੋ',
        status: 'ਸਥਿਤੀ',
      },
      support: {
        officerTitle: 'ਸਥਾਨਕ ਮੰਡੀ ਅਧਿਕਾਰੀ',
        officerName: 'ਰਾਮੇਸ਼ਵਰ ਪਟੇਲ (ਸੀਹੋਰ ਦਿਹਾਤੀ ਕੇਂਦਰ)',
        officerContact: '+91 94250 11988',
        directDeskNotice: 'ਸੰਗ੍ਰਹਿ ਕ੍ਰੇਟਸ, ਵਾਢੀ ਕੋਟਾ, ਗ੍ਰੇਡਿੰਗ ਪੁਸ਼ਟੀ ਅਤੇ ਭੁਗਤਾਨ ਸਹਾਇਤਾ ਲਈ ਸਿੱਧੀ ਤਰਜੀਹੀ ਲਾਈਨ।',
        yourTickets: 'ਸਹਾਇਤਾ ਪੁੱਛਗਿੱਛਾਂ ਅਤੇ ਟਿਕਟਾਂ',
        raiseTicket: 'ਨਵੀਂ ਸਹਾਇਤਾ ਬੇਨਤੀ ਦਰਜ ਕਰੋ',
        subject: 'ਪੁੱਛਗਿੱਛ ਦਾ ਵਿਸ਼ਾ',
        category: 'ਸ਼੍ਰੇਣੀ',
        message: 'ਸਥਾਨਕ ਐਡਮਿਨ ਲਈ ਆਪਣੀ ਲੋੜ ਬਿਆਨ ਕਰੋ...',
        submit: 'ਬੇਨਤੀ ਭੇਜੋ',
        replyAsFarmer: 'ਐਡਮਿਨ ਨੂੰ ਜਵਾਬ ਲਿਖੋ...',
        send: 'ਜਵਾਬ ਭੇਜੋ',
      },
    },
    forecasting: {
      tabTitle: 'AI ਮੰਗ ਅਨੁਮਾਨ',
      badge: 'ਜੈਮਿਨੀ AI ਵਿਸ਼ਲੇਸ਼ਣ',
      title: 'AI ਖੇਤਰੀ ਮੰਗ ਅਨੁਮਾਨ ਅਤੇ ਵਾਢੀ ਕੋਟਾ',
      subtitle: 'ਸੀਹੋਰ ਖੇਤਰ ਲਈ ਕੱਲ੍ਹ ਸਵੇਰ ਦੇ ਆਲੂ, ਚੌਲ, ਪਿਆਜ਼ ਅਤੇ ਕਣਕ ਦੀ ਮੰਗ ਦਾ ਸਟੀਕ ਅਨੁਮਾਨ। ਜ਼ੀਰੋ ਭੋਜਨ ਬਰਬਾਦੀ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਸਵੈਚਾਲਿਤ ਵਾਢੀ ਕੋਟਾ ਵੰਡ।',
      runForecastBtn: 'AI ਮੰਗ ਸਿਮੂਲੇਸ਼ਨ ਚਲਾਓ',
      runningAi: 'ਜੈਮਿਨੀ ਦੁਆਰਾ ਸੀਹੋਰ ਮੰਡੀ ਡਾਟੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਰੀ...',
      confidence: 'ਭਰੋਸੇਯੋਗਤਾ ਸਕੋਰ',
      tomorrowDemand: 'ਅਗਲੇ ਦਿਨ ਦੀ ਸਥਾਨਕ ਮੰਗ',
      cropBreakdown: 'ਫਸਲ ਮੰਗ ਬਨਾਮ ਮੰਡੀ ਸਟਾਕ',
      quotaAllocation: 'ਕਿਸਾਨ ਵਾਢੀ ਕੋਟਾ ਵੰਡ',
      allocateQuotaBtn: 'ਸਵੇਰ ਦਾ ਵਾਢੀ ਕੋਟਾ ਵੰਡੋ',
      quotaAllocated: 'ਕਿਸਾਨ ਡੈਸਕ ਨੂੰ ਕੋਟਾ ਭੇਜਿਆ ਗਿਆ',
      urgencyHigh: 'ਉੱਚ ਮੰਗ ਵਾਧਾ',
      urgencyCritical: 'ਸਟਾਕ ਘਾਟ ਚੇਤਾਵਨੀ',
      urgencyNormal: 'ਸੰਤੁਲਿਤ ਸਪਲਾਈ',
      currentStock: 'ਮੌਜੂਦਾ ਮੰਡੀ ਸਟਾਕ',
      predictedDemand: 'ਅਨੁਮਾਨਿਤ ਮੰਗ',
      deficit: 'ਸੰਭਾਵਿਤ ਘਾਟ',
      weatherImpact: 'ਮੌਸਮ ਅਤੇ ਖੇਤੀ ਪ੍ਰਭਾਵ',
      strategicAdvisories: 'ਮੰਡੀ ਆਰਥਿਕ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼',
      filterWeather: 'ਮੌਸਮ ਦੀ ਸਥਿਤੀ',
      filterEvent: 'ਸਥਾਨਕ ਸਮਾਗਮ ਸੰਦਰਭ',
      filterTimeframe: 'ਸਮਾਂ ਸੀਮਾ',
    },
    chooseSide: {
      brandTagline: 'ਸਿੱਧਾ • ਤੇਜ਼ • ਤਾਜ਼ਾ',
      zeroMiddlemen: 'ਵਿਚੋਲੀਆ-ਮੁਕਤ ਸਿੱਧਾ ਮੰਡੀ ਨੈੱਟਵਰਕ',
      subtitle: 'ਅੱਗੇ ਵਧਣ ਲਈ ਆਪਣਾ ਪੋਰਟਲ ਚੁਣੋ',
      farmerLabel: 'ਮੈਂ ਕਿਸਾਨ ਹਾਂ',
      farmerDesc: 'ਫ਼ਸਲਾਂ, ਰੋਜ਼ਾਨਾ ਵਾਢੀ ਕੋਟਾ, ਕੀਮਤ ਅਤੇ ਮੰਡੀ ਭੁਗਤਾਨ',
      adminLabel: 'ਮੈਂ ਐਡਮਿਨ ਹਾਂ',
      adminDesc: 'ਮੰਡੀ ਹੱਬ ਵੰਡ, ਜੈਮਿਨੀ ਏਆਈ ਪੂਰਵ-ਅਨੁਮਾਨ ਤੇ ਨਿਗਰਾਨੀ',
      buyerLabel: 'ਮੈਂ ਗਾਹਕ ਹਾਂ',
      buyerDesc: 'ਸਿੱਧਾ ਖੇਤ ਤੋਂ ਤਾਜ਼ਾ ਬਾਜ਼ਾਰ, ਗ੍ਰੇਡ A/B/C ਅਤੇ ਕਾਰਟ',
      riderLabel: 'ਮੈਂ ਡਿਲੀਵਰੀ ਕਰਦਾ ਹਾਂ',
      riderDesc: 'ਇਲੈਕਟ੍ਰਿਕ ਵੈਨ ਫਲੀਟ, ਰੂਟ, ਪਿਕਅੱਪ ਅਤੇ ਸੁਰੱਖਿਅਤ ਡਰਾਪ',
    },
    login: {
      farmerTitle: 'ਕਿਸਾਨ ਮੰਡੀ ਪੋਰਟਲ',
      farmerSubtitle: 'ਆਪਣੇ ਰਜਿਸਟਰਡ ਕਿਸਾਨ ਫ਼ੋਨ ਅਤੇ ਪਾਸਵਰਡ ਨਾਲ ਲੌਗਇਨ ਕਰੋ',
      adminTitle: 'ਐਡਮਿਨ ਮੰਡੀ ਹੱਬ',
      adminSubtitle: 'ਆਪਣੇ ਮੰਡੀ ਅਧਿਕਾਰੀ ਪ੍ਰਮਾਣ ਪੱਤਰਾਂ ਨਾਲ ਲੌਗਇਨ ਕਰੋ',
      riderTitle: 'ਡਿਲੀਵਰੀ ਫਲੀਟ ਪੋਰਟਲ',
      riderSubtitle: 'ਆਪਣੇ ਡਰਾਈਵਰ ਫ਼ੋਨ ਅਤੇ ਪਾਸਵਰਡ ਨਾਲ ਲੌਗਇਨ ਕਰੋ',
      phoneLabel: 'ਮੋਬਾਈਲ ਫ਼ੋਨ ਨੰਬਰ',
      adminIdLabel: 'ਐਡਮਿਨ ਫ਼ੋਨ / ਆਈਡੀ',
      passwordLabel: 'ਪਾਸਵਰਡ',
      enterPhone: 'ਰਜਿਸਟਰਡ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ',
      enterAdminId: 'ਅਧਿਕਾਰੀ ਫ਼ੋਨ ਜਾਂ ਐਡਮਿਨ ਆਈਡੀ ਦਰਜ ਕਰੋ',
      enterPassword: 'ਖਾਤਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ',
      signIn: 'ਪੋਰਟਲ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ',
      forgotPassword: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
      backToSelect: 'ਭੂਮਿਕਾ ਚੋਣ ਤੇ ਵਾਪਸ ਜਾਓ',
      demoCredentials: 'ਡੈਮੋ ਲੌਗਇਨ ਜਾਣਕਾਰੀ',
      passwordNotice: 'ਰਾਜ ਖੇਤੀਬਾੜੀ ਮੰਡੀ ਬੋਰਡ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ ਪੋਰਟਲ।',
    },
    header: {
      mandiDirect: 'ਸਿੱਧਾ ਮੰਡੀ',
      directFarmToFork: '100% ਸਿੱਧਾ ਖੇਤ ਤੋਂ ਥਾਲੀ ਤੱਕ',
      active: 'ਸਰਗਰਮ:',
      switchPortal: 'ਪੋਰਟਲ ਬਦਲੋ',
      logout: 'ਲੌਗ ਆਊਟ',
      roles: {
        buyer: 'ਗਾਹਕ',
        farmer: 'ਕਿਸਾਨ',
        admin: 'ਐਡਮਿਨ ਹੱਬ',
        rider: 'ਰਾਈਡਰ',
      },
    },
    farmerDesk: {
      heroTitle: 'ਕਿਸਾਨ ਮੰਡੀ ਡੈਸਕ',
      kisanId: 'ਕਿਸਾਨ ਆਈਡੀ',
      organicBadge: 'ਜੈਵਿਕ ਪ੍ਰਮਾਣਿਤ',
      village: 'ਪਿੰਡ',
      distance: 'ਮੰਡੀ ਦੀ ਦੂਰੀ',
      phone: 'ਫ਼ੋਨ',
      cropsSown: 'ਬੀਜੀਆਂ ਫ਼ਸਲਾਂ',
      rating: 'ਰੇਟਿੰਗ',
      settled: 'ਪ੍ਰਾਪਤ ਭੁਗਤਾਨ',
      escrow: 'ਐਸਕਰੋ ਬਕਾਇਆ',
      switchFarmer: 'ਕਿਸਾਨ ਬਦਲੋ',
      loggedInAs: 'ਕਿਸਾਨ ਵਜੋਂ ਲੌਗਇਨ',
      tabs: {
        reviews: 'ਗਾਹਕ ਸਮੀਖਿਆ ਅਤੇ ਰੇਟਿੰਗ',
        stock: 'ਮੇਰਾ ਵਾਢੀ ਸਟਾਕ ਤੇ ਗ੍ਰੇਡਿੰਗ',
        earnings: 'ਕਮਾਈ ਅਤੇ ਬੈਂਕ ਭੁਗਤਾਨ',
        support: 'ਸਥਾਨਕ ਐਡਮਿਨ ਮੰਡੀ ਸਹਾਇਤਾ',
        quota: 'ਏਆਈ ਕੋਟਾ ਤੇ ਕੱਲ੍ਹ ਦੀ ਵਾਢੀ',
      },
    },
    clientExtra: {
      noticeOnGrades: 'ਗ੍ਰੇਡ ਬਾਰੇ ਨੋਟਿਸ:',
      fairMandiTariff: 'ਵਾਜਬ ਮੰਡੀ ਦਰ',
      lowerGradeCheaper: 'ਘੱਟ ਗ੍ਰੇਡ = ਸਸਤਾ ਭਾਅ',
      activeRate: 'ਮੌਜੂਦਾ ਰੇਟ',
      recentOrders: 'ਹਾਲੀਆ ਸਿੱਧੇ ਖੇਤ ਆਰਡਰ',
      close: 'ਬੰਦ ਕਰੋ',
      categories: {
        all: 'ਸਾਰੇ',
        staples: 'ਆਲੂ ਤੇ ਪਿਆਜ਼',
        grains: 'ਚੌਲ ਤੇ ਕਣਕ',
        leafy: 'ਹਰੀਆਂ ਪੱਤੇਦਾਰ ਸਬਜ਼ੀਆਂ',
        gourds: 'ਘੀਆ ਤੇ ਕੱਦੂ',
        beans: 'ਫ਼ਲੀਆਂ ਤੇ ਦਾਲਾਂ',
        root: 'ਜੜ੍ਹਾਂ ਵਾਲੀਆਂ ਸਬਜ਼ੀਆਂ',
      },
    },
  },
};

// Universal translation helper dictionary for UI text across portals
const DICTIONARY: Record<string, Record<Language, string>> = {
  'DIRECT': { en: 'DIRECT', hi: 'सीधा', bn: 'সরাসরি', mr: 'थेट', pa: 'ਸਿੱਧਾ' },
  'FAST': { en: 'FAST', hi: 'त्वरित', bn: 'দ্রুত', mr: 'जलद', pa: 'ਤੇਜ਼' },
  'FRESH': { en: 'FRESH', hi: 'ताज़ा', bn: 'তাজা', mr: 'ताजे', pa: 'ਤਾਜ਼ਾ' },
  'Zero Middlemen': { en: 'Zero Middlemen', hi: 'कोई बिचौलिया नहीं', bn: 'কোনো দালাল নেই', mr: 'मध्यस्थ नाही', pa: 'ਕੋਈ ਵਿਚੋਲੀਆ ਨਹੀਂ' },
  'Select your portal to proceed': {
    en: 'Select your portal to proceed',
    hi: 'आगे बढ़ने के लिए अपना पोर्टल चुनें',
    bn: 'এগিয়ে যেতে আপনার পোর্টাল নির্বাচন করুন',
    mr: 'पुढे जाण्यासाठी आपले पोर्टल निवडा',
    pa: 'ਅੱਗੇ ਵਧਣ ਲਈ ਆਪਣਾ ਪੋਰਟਲ ਚੁਣੋ',
  },
  'All': { en: 'All', hi: 'सभी', bn: 'সকল', mr: 'सर्व', pa: 'ਸਾਰੇ' },
  'Add to Cart': { en: 'Add to Cart', hi: 'कार्ट में जोड़ें', bn: 'কার্টে যোগ করুন', mr: 'कार्टमध्ये जोडा', pa: 'ਕਾਰਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ' },
  'Added': { en: 'Added', hi: 'जोड़ा गया', bn: 'যোগ হয়েছে', mr: 'जोडले गेले', pa: 'ਸ਼ਾਮਲ ਕੀਤਾ' },
  'Cart': { en: 'Cart', hi: 'कार्ट', bn: 'কার্ট', mr: 'कार्ट', pa: 'ਕਾਰਟ' },
  'Close': { en: 'Close', hi: 'बंद करें', bn: 'বন্ধ করুন', mr: 'बंद करा', pa: 'ਬੰਦ ਕਰੋ' },
  'Save': { en: 'Save', hi: 'सुरक्षित करें', bn: 'সংরক্ষণ করুন', mr: 'जतन करा', pa: 'ਸੁਰੱਖਿਅਤ ਕਰੋ' },
  'Cancel': { en: 'Cancel', hi: 'रद्द करें', bn: 'বাতিল করুন', mr: 'रद्द करा', pa: 'ਰੱਦ ਕਰੋ' },
  'Confirm': { en: 'Confirm', hi: 'पुष्टि करें', bn: 'নিশ্চিত করুন', mr: 'खात्री करा', pa: 'ਪੁਸ਼ਟੀ ਕਰੋ' },
  'Status': { en: 'Status', hi: 'स्थिति', bn: 'অবস্থা', mr: 'स्थिती', pa: 'ਸਥਿਤੀ' },
  'Total': { en: 'Total', hi: 'कुल', bn: 'মোট', mr: 'एकूण', pa: 'ਕੁੱਲ' },
  'Pending': { en: 'Pending', hi: 'लंबित', bn: 'মুলতুবি', mr: 'प्रलंबित', pa: 'ਬਕਾਇਆ' },
  'Confirmed': { en: 'Confirmed', hi: 'पुष्टीकृत', bn: 'নিশ্চিত', mr: 'पुष्टीकृत', pa: 'ਪੁਸ਼ਟੀ ਹੋਈ' },
  'Harvested': { en: 'Harvested', hi: 'कटाई पूर्ण', bn: 'ফসল সংগ্রহ সম্পন্ন', mr: 'तोडणी पूर्ण', pa: 'ਵਾਢੀ ਪੂਰੀ' },
  'In Transit': { en: 'In Transit', hi: 'रास्ते में', bn: 'পথে রয়েছে', mr: 'वाटेत आहे', pa: 'ਰਸਤੇ ਵਿੱਚ' },
  'Delivered': { en: 'Delivered', hi: 'डिलीवर किया गया', bn: 'ডেলিভার করা হয়েছে', mr: 'वितरित केले', pa: 'ਡਿਲੀਵਰ ਹੋ ਗਿਆ' },
  'Cancelled': { en: 'Cancelled', hi: 'रद्द किया गया', bn: 'বাতিল হয়েছে', mr: 'रद्द केले', pa: 'ਰੱਦ ਹੋ ਗਿਆ' },
  'Grade A': { en: 'Grade A', hi: 'ग्रेड A', bn: 'গ্রেড A', mr: 'ग्रेड A', pa: 'ਗ੍ਰੇਡ A' },
  'Grade B': { en: 'Grade B', hi: 'ग्रेड B', bn: 'গ্রেড B', mr: 'ग्रेड B', pa: 'ਗ੍ਰੇਡ B' },
  'Grade C': { en: 'Grade C', hi: 'ग्रेड C', bn: 'গ্রেড C', mr: 'ग्रेड C', pa: 'ਗ੍ਰੇਡ C' },
  'Premium': { en: 'Premium', hi: 'प्रीमियम', bn: 'প্রিমিয়াম', mr: 'प्रीमियम', pa: 'ਪ੍ਰੀਮੀਅਮ' },
  'Standard': { en: 'Standard', hi: 'मानक', bn: 'স্ট্যান্ডার্ড', mr: 'मानक', pa: 'ਮਿਆਰੀ' },
  'Economy': { en: 'Economy', hi: 'किफ़ायती', bn: 'সাশ্রয়ী', mr: 'किफायतशीर', pa: 'ਸਸਤਾ' },
  'Kisan ID': { en: 'Kisan ID', hi: 'किसान आईडी', bn: 'কিষাণ আইডি', mr: 'किसान ओळखपत्र', pa: 'ਕਿਸਾਨ ਆਈਡੀ' },
  'Organic Certified': { en: 'Organic Certified', hi: 'जैविक प्रमाणित', bn: 'জৈব প্রত্যয়িত', mr: 'सेंद्रिय प्रमाणित', pa: 'ਜੈਵਿਕ ਪ੍ਰਮਾਣਿਤ' },
  'Switch Farmer': { en: 'Switch Farmer', hi: 'किसान बदलें', bn: 'কৃষক পরিবর্তন', mr: 'शेतकरी बदला', pa: 'ਕਿਸਾਨ ਬਦਲੋ' },
  'Rating': { en: 'Rating', hi: 'रेटिंग', bn: 'রেটিং', mr: 'रेटिंग', pa: 'ਰੇਟਿੰਗ' },
  'Settled': { en: 'Settled', hi: 'प्राप्त भुगतान', bn: 'পরিশোধিত', mr: 'मिळालेला मोबदला', pa: 'ਪ੍ਰਾਪਤ ਭੁਗਤਾਨ' },
  'Escrow': { en: 'Escrow', hi: 'एस्क्रो', bn: 'এসক্রো', mr: 'जमा शिल्लक', pa: 'ਐਸਕਰੋ' },
  'Village': { en: 'Village', hi: 'गाँव', bn: 'গ্রাম', mr: 'गाव', pa: 'ਪਿੰਡ' },
  'Phone': { en: 'Phone', hi: 'फ़ोन', bn: 'फोन', mr: 'फोन', pa: 'ਫ਼ੋਨ' },
  'Crops Sown': { en: 'Crops Sown', hi: 'बोई गई फसलें', bn: 'বপনকৃত ফসল', mr: 'पेरलेली पिके', pa: 'ਬੀਜੀਆਂ ਫ਼ਸਲਾਂ' },
  'Notice on Grades:': { en: 'Notice on Grades:', hi: 'ग्रेड पर विशेष सूचना:', bn: 'গ্রেড সংক্রান্ত বিজ্ঞপ্তি:', mr: 'प्रतवारीबाबत महत्त्वाची सूचना:', pa: 'ਗ੍ਰੇਡ ਬਾਰੇ ਨੋਟਿਸ:' },
  'FAIR MANDI TARIFF': { en: 'FAIR MANDI TARIFF', hi: 'उचित मंडी टैरिफ', bn: 'ন্যায্য মান্ডি ট্যারিফ', mr: 'रास्त बाजारभाव दर', pa: 'ਵਾਜਬ ਮੰਡੀ ਦਰ' },
  'Lower Grade = Cheaper Price': { en: 'Lower Grade = Cheaper Price', hi: 'कम ग्रेड = अधिक सस्ता दाम', bn: 'কম গ্রেড = সস্তা দাম', mr: 'कमी ग्रेड = अधिक स्वस्त दर', pa: 'ਘੱਟ ਗ੍ਰੇਡ = ਸਸਤਾ ਭਾਅ' },
  'Active Rate': { en: 'Active Rate', hi: 'सक्रिय दर', bn: 'বর্তমান দর', mr: 'चालू दर', pa: 'ਮੌਜੂਦਾ ਰੇਟ' },
  'Recent Direct Farm Orders': { en: 'Recent Direct Farm Orders', hi: 'हाल के सीधे खेत के ऑर्डर', bn: 'সাম্প্রতিক সরাসরি খামার অর্ডার', mr: 'अलीकडील थेट शेतकरी ऑर्डर्स', pa: 'ਹਾਲੀਆ ਸਿੱਧੇ ਖੇਤ ਆਰਡਰ' },
  'Log Out': { en: 'Log Out', hi: 'लॉग आउट', bn: 'লগ আউট', mr: 'लॉग आऊट', pa: 'ਲੌਗ ਆਊਟ' },
  "I'm farmer": { en: "I'm farmer", hi: 'मैं किसान हूँ', bn: 'আমি কৃষক', mr: 'मी शेतकरी आहे', pa: 'ਮੈਂ ਕਿਸਾਨ ਹਾਂ' },
  "I'm Admin": { en: "I'm Admin", hi: 'मैं एडमिन हूँ', bn: 'আমি অ্যাডমিন', mr: 'मी ॲडमिन आहे', pa: 'ਮੈਂ ਐਡਮਿਨ ਹਾਂ' },
  "I'm Buyer": { en: "I'm Buyer", hi: 'मैं ग्राहक हूँ', bn: 'আমি ক্রেতা', mr: 'मी ग्राहक आहे', pa: 'ਮੈਂ ਗਾਹਕ ਹਾਂ' },
  'I deliver': { en: 'I deliver', hi: 'मैं डिलीवरी करता हूँ', bn: 'আমি ডেলিভারি করি', mr: 'मी डिलिव्हरी करतो', pa: 'ਮੈਂ ਡਿਲੀਵਰੀ ਕਰਦਾ ਹਾਂ' },
  'Direct ₪ Fair': { en: 'Direct ₪ Fair', hi: 'प्रत्यक्ष ₪ उचित', bn: 'সরাসরি ₪ ন্যায্য', mr: 'थेट ₪ रास्त', pa: 'ਸਿੱਧਾ ₪ ਵਾਜਬ' },
  'Back to Portals': { en: 'Back to Portals', hi: 'पोर्टल चयन पर वापस जाएँ', bn: 'পোর্টাল নির্বাচনে ফিরে যান', mr: 'पोर्टल निवडीवर परत जा', pa: 'ਪੋਰਟਲ ਚੋਣ ਤੇ ਵਾਪਸ ਜਾਓ' },
  'phone no.': { en: 'phone no.', hi: 'फ़ोन नंबर', bn: 'ফোন নম্বর', mr: 'फोन नंबर', pa: 'ਫ਼ੋਨ ਨੰਬਰ' },
  'password': { en: 'password', hi: 'पासवर्ड', bn: 'পাসওয়ার্ড', mr: 'पासवर्ड', pa: 'ਪਾਸਵਰਡ' },
  'Forgot pasword': { en: 'Forgot pasword', hi: 'पासवर्ड भूल गए?', bn: 'পাসওয়ার্ড ভুলে গেছেন?', mr: 'पासवर्ड विसरलात?', pa: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?' },
  'Forgot Password?': { en: 'Forgot Password?', hi: 'पासवर्ड भूल गए?', bn: 'পাসওয়ার্ড ভুলে গেছেন?', mr: 'पासवर्ड विसरलात?', pa: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?' },
  'LOGIN': { en: 'LOGIN', hi: 'लॉगिन करें', bn: 'লগইন', mr: 'लॉगिन करा', pa: 'ਲੌਗਇਨ' },
  'Sign In': { en: 'Sign In', hi: 'साइन इन करें', bn: 'সাইন ইন', mr: 'साइन इन करा', pa: 'ਸਾਈਨ ਇਨ' },
  'Active:': { en: 'Active:', hi: 'सक्रिय:', bn: 'সক্রিয়:', mr: 'सक्रिय:', pa: 'ਸਰਗਰਮ:' },
  'Choose Side': { en: 'Choose Side', hi: 'पोर्टल चुनें', bn: 'পোর্টাল পরিবর্তন', mr: 'पोर्टल निवडा', pa: 'ਪੋਰਟਲ ਚੁਣੋ' },
  'Quick Drawer': { en: 'Quick Drawer', hi: 'त्वरित दराज़', bn: 'দ্রুত ড্রয়ার', mr: 'झटपट पॅनेल', pa: 'ਤੁਰੰਤ ਡੈਸਕ' },
  'Admin Hub': { en: 'Admin Hub', hi: 'एडमिन हब', bn: 'অ্যাডমিন হাব', mr: 'ॲडमिन हब', pa: 'ਐਡਮਿਨ ਹੱਬ' },
  'Farmer': { en: 'Farmer', hi: 'किसान', bn: 'কৃষক', mr: 'शेतकरी', pa: 'ਕਿਸਾਨ' },
  'Rider': { en: 'Rider', hi: 'राइडर', bn: 'রাইডার', mr: 'रायडर', pa: 'ਰਾਈਡਰ' },
  'Buyer': { en: 'Buyer', hi: 'ग्राहक', bn: 'ক্রেতা', mr: 'ग्राहक', pa: 'ਗਾਹਕ' },
  'MANDI DIRECT': { en: 'MANDI DIRECT', hi: 'सीधा मंडी', bn: 'সরাসরি মান্ডি', mr: 'थेट बाजार', pa: 'ਸਿੱਧਾ ਮੰਡੀ' },
  '100% DIRECT FARM-TO-FORK': { en: '100% DIRECT FARM-TO-FORK', hi: '100% सीधे खेत से रसोई तक', bn: '১০০% সরাসরি খামার থেকে থালা', mr: '१००% थेट शेतातून ताटात', pa: '100% ਸਿੱਧਾ ਖੇਤ ਤੋਂ ਰਸੋਈ' },
  'Daily Household': { en: 'Daily Household', hi: 'दैनिक घरेलू रसोई', bn: 'দৈনন্দিন গৃহস্থালি', mr: 'दैनंदिन घरगुती', pa: 'ਰੋਜ਼ਾਨਾ ਘਰੇਲੂ' },
  'Next-Day Morning Delivery': { en: 'Next-Day Morning Delivery', hi: 'अगली सुबह ताज़ी डिलीवरी', bn: 'পরের দিন সকালে ডেলিভারি', mr: 'दुसऱ्या दिवशी सकाळी डिलिव्हरी', pa: 'ਅਗਲੇ ਦਿਨ ਸਵੇਰੇ ਡਿਲੀਵਰੀ' },
  'Bulk / Catering': { en: 'Bulk / Catering', hi: 'थोक / खानपान', bn: 'পাইকারি / ক্যাটারিং', mr: 'घाऊक / खानपान', pa: 'ਥੋਕ / ਕੈਟਰਿੰਗ' },
  'Next-Day • 30% advance token': { en: 'Next-Day • 30% advance token', hi: 'अगले दिन • 30% अग्रिम बयाना', bn: 'পরের দিন • ৩০% অগ্রিম টোকেন', mr: 'दुसऱ्या दिवशी • ३०% आगाऊ रक्कम', pa: 'ਅਗਲੇ ਦਿਨ • 30% ਪੇਸ਼ਗੀ ਟੋਕਨ' },
  'Clear Basket': { en: 'Clear Basket', hi: 'टोकरी खाली करें', bn: 'ঝুড়ি খালি করুন', mr: 'टोपली रिकामी करा', pa: 'ਟੋਕਰੀ ਖ਼ਾਲੀ ਕਰੋ' },
  'Delivery Address': { en: 'Delivery Address', hi: 'डिलीवरी का पता', bn: 'ডেলিভারির ঠিকানা', mr: 'डिलिव्हरी पत्ता', pa: 'ਡਿਲੀਵਰੀ ਪਤਾ' },
  'Next-Day Locality Route': { en: 'Next-Day Locality Route', hi: 'अगले दिन इलाका मार्ग', bn: 'পরের দিন এলাকা রুট', mr: 'दुसऱ्या दिवशी स्थानिक मार्ग', pa: 'ਅਗਲੇ ਦਿਨ ਇਲਾਕਾ ਰੂਟ' },
  'Scheduled Slot: Tomorrow Morning (7:00 AM – 11:00 AM)': {
    en: 'Scheduled Slot: Tomorrow Morning (7:00 AM – 11:00 AM)',
    hi: 'निर्धारित समय: कल सुबह (7:00 AM – 11:00 AM)',
    bn: 'নির্ধারিত সময়: কাল সকাল (৭:০০ AM – ১১:০০ AM)',
    mr: 'नियोजित वेळ: उद्या सकाळी (७:०० AM – ११:०० AM)',
    pa: 'ਨਿਰਧਾਰਤ ਸਮਾਂ: ਕੱਲ੍ਹ ਸਵੇਰੇ (7:00 AM – 11:00 AM)',
  },
  'Total Bulk Produce:': { en: 'Total Bulk Produce:', hi: 'कुल थोक उपज:', bn: 'মোট পাইকারি ফলন:', mr: 'एकूण घाऊक भाजीपाला:', pa: 'ਕੁੱਲ ਥੋਕ ਉਪਜ:' },
  'Advance Token to Pay Now': { en: 'Advance Token to Pay Now', hi: 'अभी भुगतान करने योग्य अग्रिम टोकन', bn: 'এখন প্রদেয় অগ্রিম টোকেন', mr: 'आता द्यावयाची आगाऊ रक्कम', pa: 'ਹੁਣ ਭੁਗਤਾਨਯੋਗ ਪੇਸ਼ਗੀ ਟੋਕਨ' },
  'Remaining Balance on Doorstep:': { en: 'Remaining Balance on Doorstep:', hi: 'दरवाजे पर शेष भुगतान:', bn: 'ডেলিভারির সময় বাকি অর্থ:', mr: 'दारावर उर्वरित रक्कम:', pa: 'ਡਿਲੀਵਰੀ ਸਮੇਂ ਬਾਕੀ ਰਕਮ:' },
  'Select Token Advance (Minimum 30%):': { en: 'Select Token Advance (Minimum 30%):', hi: 'अग्रिम टोकन चुनें (न्यूनतम 30%):', bn: 'অগ্রিম টোকেন নির্বাচন করুন (ন্যূনতম ৩০%):', mr: 'आगाऊ रक्कम निवडा (किमान ३०%):', pa: 'ਪੇਸ਼ਗੀ ਟੋਕਨ ਚੁਣੋ (ਘੱਟੋ-ਘੱਟ 30%):' },
  'Live Tracking →': { en: 'Live Tracking →', hi: 'लाइव ट्रैकिंग →', bn: 'লাইভ ট্র্যাকিং →', mr: 'थेट ट्रॅकिंग →', pa: 'ਲਾਈਵ ਟਰੈਕਿੰਗ →' },
  'Help / Care': { en: 'Help / Care', hi: 'सहायता केंद्र', bn: 'সহায়তা কেন্দ্র', mr: 'मदत केंद्र', pa: 'ਸਹਾਇਤਾ ਕੇਂਦਰ' },
  'Order Placed & Scheduled': { en: 'Order Placed & Scheduled', hi: 'ऑर्डर दर्ज व निर्धारित हुआ', bn: 'অর্ডার গৃহীত ও নির্ধারিত', mr: 'ऑर्डर नोंदवली व नियोजित केली', pa: 'ਆਰਡਰ ਦਰਜ ਤੇ ਨਿਰਧਾਰਤ ਹੋਇਆ' },
  'Allocated & Quality Verified': { en: 'Allocated & Quality Verified', hi: 'आवंटित व गुणवत्ता प्रमाणित', bn: 'বরাদ্দ ও মান যাচাইকৃত', mr: 'वाटप व दर्जा प्रमाणित', pa: 'ਵੰਡਿਆ ਤੇ ਗੁਣਵੱਤਾ ਪ੍ਰਮਾਣਿਤ' },
  'Morning Farm Pickup & Weighed': { en: 'Morning Farm Pickup & Weighed', hi: 'सुबह खेत से उठाव व तौल', bn: 'সকালে খামার থেকে তোলা ও ওজন', mr: 'सकाळी शेतातून उचल व वजन', pa: 'ਸਵੇਰੇ ਖੇਤੋਂ ਚੁੱਕਿਆ ਤੇ ਤੋਲਿਆ' },
  'Out on Locality Delivery Route': { en: 'Out on Locality Delivery Route', hi: 'इलाके में डिलीवरी के लिए रवाना', bn: 'এলাকায় ডেলিভারির পথে', mr: 'भागात डिलिव्हरीसाठी रवाना', pa: 'ਇਲਾਕੇ ਵਿੱਚ ਡਿਲੀਵਰੀ ਲਈ ਰਵਾਨਾ' },
  'Delivered & Handed Over': { en: 'Delivered & Handed Over', hi: 'सफलतापूर्वक सुपुर्द किया गया', bn: 'সফলভাবে হস্তান্তর করা হয়েছে', mr: 'यशस्वीरीत्या सुपूर्द केले', pa: 'ਸਫਲਤਾਪੂਰਵਕ ਸੌਂਪਿਆ ਗਿਆ' },
  'staples': { en: 'Potatoes & Onions', hi: 'आलू व प्याज', bn: 'আলু ও পেঁয়াজ', mr: 'बटाटा व कांदा', pa: 'ਆਲੂ ਤੇ ਪਿਆਜ਼' },
  'grains': { en: 'Rice & Wheat', hi: 'चावल व गेहूँ', bn: 'চাল ও গম', mr: 'तांदूळ व गहू', pa: 'ਚੌਲ ਤੇ ਕਣਕ' },
  'leafy': { en: 'Leafy Greens', hi: 'हरी पत्तेदार सब्जियाँ', bn: 'শাকসবজি', mr: 'पालेभाज्या', pa: 'ਹਰੀਆਂ ਪੱਤੇਦਾਰ ਸਬਜ਼ੀਆਂ' },
  'gourds': { en: 'Gourds & Squashes', hi: 'लौकी व कद्दू', bn: 'লাউ ও কুমড়ো', mr: 'दुधी व भोपळा', pa: 'ਘੀਆ ਤੇ ਕੱਦੂ' },
  'beans': { en: 'Beans & Legumes', hi: 'फलियाँ व दालें', bn: 'শিম ও ডাল', mr: 'शेंगा व कडधान्ये', pa: 'ਫ਼ਲੀਆਂ ਤੇ ਦਾਲਾਂ' },
  'root': { en: 'Root Vegetables', hi: 'जड़ वाली सब्जियाँ', bn: 'मूलজাতীয় সবজি', mr: 'कंदमुळे', pa: 'ਜੜ੍ਹਾਂ ਵਾਲੀਆਂ ਸਬਜ਼ੀਆਂ' },
  'placed': { en: 'Order Placed', hi: 'ऑर्डर दर्ज', bn: 'অর্ডার নথিভুক্ত', mr: 'ऑर्डर नोंदवली', pa: 'ਆਰਡਰ ਦਰਜ' },
  'admin_allocated': { en: 'Allocated to Farmer', hi: 'किसान को आवंटित', bn: 'কৃষককে বরাদ্দ', mr: 'शेतकऱ्याला वाटप', pa: 'ਕਿਸਾਨ ਨੂੰ ਵੰਡਿਆ' },
  'rider_assigned': { en: 'Rider Assigned', hi: 'राइडर निर्धारित', bn: 'রাইডার নির্ধারিত', mr: 'रायडर नियुक्त', pa: 'ਰਾਈਡਰ ਨਿਰਧਾਰਤ' },
  'picked_up': { en: 'Picked Up From Farm', hi: 'खेत से उठाया गया', bn: 'খামার থেকে তোলা হয়েছে', mr: 'शेतातून उचलले', pa: 'ਖੇਤੋਂ ਚੁੱਕਿਆ ਗਿਆ' },
  'out_for_delivery': { en: 'Out for Delivery', hi: 'डिलीवरी के लिए रवाना', bn: 'ডেলিভারির পথে', mr: 'डिलिव्हरीसाठी रवाना', pa: 'ਡਿਲੀਵਰੀ ਲਈ ਰਵਾਨਾ' },
  'delivered': { en: 'Delivered', hi: 'सफल डिलीवरी', bn: 'ডেলিভার সম্পন্ন', mr: 'वितरित झाले', pa: 'ਡਿਲੀਵਰ ਹੋਇਆ' },
  'cancelled': { en: 'Cancelled', hi: 'रद्द किया गया', bn: 'বাতিল', mr: 'रद्द केले', pa: 'ਰੱਦ ਹੋਇਆ' },
  'All Deliveries Cleared!': {
    en: 'All Deliveries Cleared!',
    hi: 'सभी डिलीवरी पूर्ण!',
    bn: 'সব ডেলিভারি সম্পন্ন!',
    mr: 'सर्व डिलिव्हरी पूर्ण!',
    pa: 'ਸਾਰੀਆਂ ਡਿਲੀਵਰੀਆਂ ਮੁਕੰਮਲ!',
  },
  'Assigned Pickups & Deliveries': {
    en: 'Assigned Pickups & Deliveries',
    hi: 'आवंटित पिकअप व डिलीवरी',
    bn: 'বরাদ্দকৃত পিকআপ ও ডেলিভারি',
    mr: 'नेमून दिलेले पिकअप आणि डिलिव्हरी',
    pa: 'ਨਿਰਧਾਰਤ ਪਿਕਅੱਪ ਤੇ ਡਿਲੀਵਰੀ',
  },
  'Completed Trips Today': {
    en: 'Completed Trips Today',
    hi: 'आज की पूर्ण यात्राएँ',
    bn: 'আজকের সম্পন্ন ট্রিপ',
    mr: 'आजच्या पूर्ण झालेल्या फेऱ्या',
    pa: 'ਅੱਜ ਦੇ ਮੁਕੰਮਲ ਗੇੜੇ',
  },
  'Switch Rider:': { en: 'Switch Rider:', hi: 'राइडर बदलें:', bn: 'রাইডার পরিবর্তন:', mr: 'रायडर बदला:', pa: 'ਰਾਈਡਰ ਬਦਲੋ:' },
  'Distance to Mandi:': { en: 'Distance to Mandi:', hi: 'मंडी की दूरी:', bn: 'মান্ডির দূরত্ব:', mr: 'बाजाराचे अंतर:', pa: 'ਮੰਡੀ ਦੀ ਦੂਰੀ:' },
  'Logged In As Farmer:': { en: 'Logged In As Farmer:', hi: 'किसान के रूप में लॉग इन:', bn: 'কৃষক হিসেবে লগইন:', mr: 'शेतकरी म्हणून लॉगिन:', pa: 'ਕਿਸਾਨ ਵਜੋਂ ਲੌਗਇਨ:' },
  'Switch Farmer:': { en: 'Switch Farmer:', hi: 'किसान बदलें:', bn: 'কৃষক পরিবর্তন:', mr: 'शेतकरी बदला:', pa: 'ਕਿਸਾਨ ਬਦਲੋ:' },
  'Customer Reviews & Ratings': {
    en: 'Customer Reviews & Ratings',
    hi: 'ग्राहक समीक्षा व रेटिंग',
    bn: 'গ্রাহক পর্যালোচনা ও রেটিং',
    mr: 'ग्राहक अभिप्राय व रेटिंग',
    pa: 'ਗਾਹਕ ਸਮੀਖਿਆ ਅਤੇ ਰੇਟਿੰਗ',
  },
  'My Harvest Stock & Grading': {
    en: 'My Harvest Stock & Grading',
    hi: 'मेरी कटाई का स्टॉक व ग्रेडिंग',
    bn: 'আমার ফসল মজুদ ও গ্রেডিং',
    mr: 'माझा भाजीपाला साठा व प्रतवारी',
    pa: 'ਮੇਰਾ ਵਾਢੀ ਸਟਾਕ ਤੇ ਗ੍ਰੇਡਿੰਗ',
  },
  'Bank Earnings & Payouts': {
    en: 'Bank Earnings & Payouts',
    hi: 'बैंक कमाई व भुगतान',
    bn: 'ব্যাংক উপার্জন ও অর্থপ্রদান',
    mr: 'बँक कमाई व मोबदला',
    pa: 'ਬੈਂਕ ਕਮਾਈ ਤੇ ਭੁਗਤਾਨ',
  },
  'Local Admin Mandi Desk': {
    en: 'Local Admin Mandi Desk',
    hi: 'लोकल एडमिन मंडी सहायता',
    bn: 'স্থানীয় অ্যাডমিন মান্ডি সহায়তা',
    mr: 'स्थानिक ॲडमिन बाजार मदत कक्ष',
    pa: 'ਸਥਾਨਕ ਐਡਮਿਨ ਮੰਡੀ ਸਹਾਇਤਾ',
  },
  "AI Quota & Tomorrow's Harvest": {
    en: "AI Quota & Tomorrow's Harvest",
    hi: 'एआई कोटा व कल की कटाई',
    bn: 'এআই কোটা ও আগামীকালের সংগ্রহ',
    mr: 'एआय कोटा व उद्याची तोडणी',
    pa: 'ਏਆਈ ਕੋਟਾ ਤੇ ਕੱਲ੍ਹ ਦੀ ਵਾਢੀ',
  },
};

export function translateText(text: string, lang: Language): string {
  if (!text || lang === 'en') return text;
  const direct = DICTIONARY[text]?.[lang];
  if (direct) return direct;
  const trimmed = text.trim();
  const trimmedMatch = DICTIONARY[trimmed]?.[lang];
  if (trimmedMatch) return trimmedMatch;
  return text;
}
