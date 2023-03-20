import Strings from './Strings';
import Images from './Images';

const roles = {
    user: 'user',
    superAdmin: 'superadmin',
    payorAdmin: 'payoradmin'
}

const challengeStatus = {
    started: 'started',
    pending: 'pending',
    expired: 'expired'
}

const competitionStatus = {
    started: 'started',
    pending: 'pending',
    expired: 'expired'
}

const teamConfigration = {
    MANUALLY: 'manually',
    AUTOMATICALLY: 'automatically'
}

const competitionCreationWays = [
    {
        id: 'manually',
        name: Strings.txtManuallyCreate
    },
    {
        id: 'automatically',
        name: Strings.txtAutomaticallyCreate
    }
]
   
const permissions = {
    read: 'read',
    create: 'create',
    update: 'update',
    delete: 'delete'
}
const targetStatues = {
    below: 'hypo',
    onTarget: 'good',
    over: 'hyper'
}

const callengeCategories = [
    {
        id: "steps",
        name: "Steps"
    },
    {
        id: "stairs",
        name: "Stairs"
    },
    {
        id: "sleeps",
        name: "Sleeps"
    },
    {
        id: "activities",
        name: "Activities"
    }
]
const baseAdminAccesses = [
    {
        page: 'dashboard',
        adminPage: 'Dashboard',
        create: null,
        read: false,
        update: false,
        delete: null
    },
    {
        page: 'userManagement',
        adminPage: 'User Management',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'department',
        adminPage: 'Department',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'jobLevel',
        adminPage: 'Job Title',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'challenge',
        adminPage: 'Challenge',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'competition',
        adminPage: 'Competition',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'rewards',
        adminPage: 'Rewards',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'pointHistory',
        adminPage: 'Point History',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'analytics',
        adminPage: 'Analytics',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'packageInvoice',
        adminPage: 'Package & Invoice',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'banner',
        adminPage: 'Banner',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'themeSetting',
        adminPage: 'Theme Setting',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'broadcast',
        adminPage: 'Broadcast',
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        page: 'report',
        adminPage: 'Report',
        create: false,
        read: false,
        update: false,
        delete: false
    },
]

const packageFeatures = [
    {
        id: 'healthRisk',
        name: Strings.txtFeatureHealthRisk       
    },
    {
        id: 'consultation',
        name: Strings.txtFeatureConsultation       
    },
    {
        id: 'symptom',
        name: Strings.txtFeatureSymptoms       
    },
    {
        id: 'medication',
        name: Strings.txtFeatureMedications       
    },    
    {
        id: 'weight',
        name: Strings.txtFeatureWeight       
    },   
    {
        id: 'food',
        name: Strings.txtFeatureHealthRisk       
    },   
    {
        id: 'sleep',
        name: Strings.txtFeatureSleep       
    },   
    {
        id: 'step',
        name: Strings.txtFeatureStep       
    },   
    {
        id: 'stair',
        name: Strings.txtFeatureStair       
    },   
    {
        id: 'water',
        name: Strings.txtFeatureWater       
    },   
    {
        id: 'veggie',
        name: Strings.txtFeatureVeggies       
    },   
    {
        id: 'fruit',
        name: Strings.txtFeatureFruit       
    },   
    {
        id: 'exercise',
        name: Strings.txtFeatureExercise       
    },   
    {
        id: 'bloodGlucose',
        name: Strings.txtFeatureBloodGlucose       
    },   
    {
        id: 'customChallenge',
        name: Strings.txtFeatureCustomizableChallenge       
    },   
    {
        id: 'customReward',
        name: Strings.txtFeatureCustomizableRewards       
    },   
]

const genders = [
    {
        id: 'female',
        name: 'Female'
    },
    {
        id: 'male',
        name: 'Male'
    }
]

const repeatFrequency = [
    {
        id: 'daily',
        name: 'Daily'
    },
    {
        id: 'weekly',
        name: 'Weekly'
    }
]

const error = {
    errorUrl: "/error"
}
const repeatFor = [
    {
        id: 1,
        name: '1'
    },    {
        id: 2,
        name: '2'
    },
    {
        id: 3,
        name: '3'
    },
    {
        id: 4,
        name: '4'
    },
    {
        id: 5,
        name: '5'
    },
    {
        id: 10,
        name: '10'
    }
]

const pages = {
    DASHBOARD: 'dashboard',
    USER_MANAGEMENT: 'userManagement',
    DEPARTMENT: 'department',
    JOB_LEVEL: 'jobLevel',
    CHALLENGE: 'challenge',
    COMPETITION: 'competition',
    REWARDS: 'rewards',
    POINT_HISTORY: 'pointHistory',
    ANALYTICS: 'analytics',
    PACKAGE_INVOICE: 'packageInvoice',
    BANNER: 'banner',
    THEME_SETTING: 'themeSetting',
    BROADCAST: 'broadcast',
    REPORT: 'report'
}

const pagePermissions = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
}
export default {
    roles,
    permissions,
    packageFeatures,
    callengeCategories,
    genders,
    repeatFrequency,
    repeatFor,
    challengeStatus,
    competitionStatus,
    baseAdminAccesses,
    competitionCreationWays,
    teamConfigration,
    error,
    PAGE : pages,
    PAGE_PERMISSION : pagePermissions,
    TARGET_STATUS: targetStatues,
    
    
}



export function getConstantItemId(content, arr) {
    var result = arr.filter(x => x.name === content).map(x => x.id);
    return result ? result[0] : null;
}

export function getConstantItemName(content, arr) {
    return arr.filter(x => x.id.toString() === content.toString()).map(x => x.name).toString();
}