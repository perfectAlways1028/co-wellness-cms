import { Images, Strings } from "../../constants"
const superAdminMenu = [
    {
        id: 1,
        iconOn: Images.tabIconDashboardOn,
        iconOff: Images.tabIconDashboardOff,
        name: Strings.txtDashboard,
        label: Strings.txtMenuDashboard
    },
    {
        id: 13,
        iconOn: Images.tabIconChallengeOn,
        iconOff: Images.tabIconChallengeOff,
        name: Strings.txtChallenge,
        label: Strings.txtMenuChallenge
    },
    {
        id: 19,
        iconOn: Images.tabIconRewardOn,
        iconOff: Images.tabIconRewardOff,
        name: Strings.txtRewards,
        label: Strings.txtMenuReward
    },
    {
        id: 2,
        iconOn: Images.tabIconUserManagementOn,
        iconOff: Images.tabIconUserManagementOff,
        name: Strings.txtUserManagement,
        label: Strings.txtMenuUserManagement
    },

    {
        id: 4,
        iconOn: Images.tabIconPayorOn,
        iconOff: Images.tabIconPayorOff,
        name: Strings.txtPayor,
        label: Strings.txtMenuPayor,
        isGroup: true,
        children: [
            {
                id: 5,
                iconOn: Images.tabIconPayorOn,
                iconOff: Images.tabIconPayorOff,
                name: Strings.txtPayorList,
                label: Strings.txtMenuPayorList
            },
            {
                id: 6,
                iconOn: Images.tabIconBannerOn,
                iconOff: Images.tabIconBannerOff,
                name: Strings.txtBanner,
                label: Strings.txtMenuBanner
            }
        ]
    },
    {
        id: 7,
        iconOn: Images.tabIconMasterDataOn,
        iconOff: Images.tabIconMasterDataOff,
        name: Strings.txtMasterData,
        label: Strings.txtMenuMasterData,
        isGroup: true,
        children: [
            {
                id: 8,
                iconOn: Images.tabIconMasterDataOn,
                iconOff: Images.tabIconMasterDataOff,
                name: Strings.txtMyWellness,
                label: Strings.txtMenuMyWellness,
            },
            {
                id: 9,
                iconOn: Images.tabIconMasterDataOn,
                iconOff: Images.tabIconMasterDataOff,
                name: Strings.txtPackage,
                label: Strings.txtMenuPackage,
            },
            {
                id: 10,
                iconOn: Images.tabIconMasterDataOn,
                iconOff: Images.tabIconMasterDataOff,
                name: Strings.txtHealthRiskQuiz,
                label: Strings.txtMenuHealthRiskQuiz,
            },
            {
                id: 11,
                iconOn: Images.tabIconMasterDataOn,
                iconOff: Images.tabIconMasterDataOff,
                name: Strings.txtChallengeTemplate,
                label: Strings.txtMenuChallengeTemplate,
            },
            {
                id: 12,
                iconOn: Images.tabIconMasterDataOn,
                iconOff: Images.tabIconMasterDataOff,
                name: Strings.txtRewardType,
                label: Strings.txtMenuRewardType,
            },

        ]
    },
    {
        id: 14,
        iconOn: Images.tabIconPointHistoryOn,
        iconOff: Images.tabIconPointHistoryOff,
        name: Strings.txtPointHistory,
        label: Strings.txtMenuPointHistory,

    },
    {
        id: 15,
        iconOn: Images.tabIconInvoiceOn,
        iconOff: Images.tabIconInvoiceOff,
        name: Strings.txtPackageAndInvoice,
        label: Strings.txtMenuPackageInvoice,
    },
    {
        id: 17,
        iconOn: Images.tabIconBroadcastOn,
        iconOff: Images.tabIconBroadcastOff,
        name: Strings.txtBroadcast,
        label: Strings.txtMenuBroadcast,
    },
    {
        id: 18,
        iconOn: Images.tabIconReportOn,
        iconOff: Images.tabIconReportOff,
        name: Strings.txtReport,
        label: Strings.txtMenuReport,
    },

]

const payorAdminMenu = [
    {
        id: 1,
        iconOn: Images.tabIconDashboardOn,
        iconOff: Images.tabIconDashboardOff,
        name: Strings.txtDashboard,
        label: Strings.txtMenuDashboard
    },
    {
        id: 15,
        iconOn: Images.tabIconChallengeOn,
        iconOff: Images.tabIconChallengeOff,
        name: Strings.txtCompetition,
        label: Strings.txtMenuComeptition
    },
    {
        id: 3,
        iconOn: Images.tabIconChallengeOn,
        iconOff: Images.tabIconChallengeOff,
        name: Strings.txtChallenge,
        label: Strings.txtMenuChallenge
    },
    {
        id: 4,
        iconOn: Images.tabIconRewardOn,
        iconOff: Images.tabIconRewardOff,
        name: Strings.txtRewards,
        label: Strings.txtMenuReward
    },
    {
        id: 14,
        iconOn: Images.tabIconJobLevelOn,
        iconOff: Images.tabIconJobLevelOff,
        name: Strings.txtDepartment,
        label: Strings.txtMenuDepartment
    },
    {
        id: 2,
        iconOn: Images.tabIconJobLevelOn,
        iconOff: Images.tabIconJobLevelOff,
        name: Strings.txtJobLevel,
        label: Strings.txtMenuJobTitle
    },
    {
        id: 13,
        iconOn: Images.tabIconUserManagementOn,
        iconOff: Images.tabIconUserManagementOff,
        name: Strings.txtUserManagement,
        label: Strings.txtMenuUserManagement
    },

    {
        id: 5,
        iconOn: Images.tabIconPointHistoryOn,
        iconOff: Images.tabIconPointHistoryOff,
        name: Strings.txtPointHistory,
        label: Strings.txtMenuPointHistory
    },
    {
        id: 17,
        iconOn: Images.tabIconPointHistoryOn,
        iconOff: Images.tabIconPointHistoryOff,
        name: Strings.txtRewardHistory,
        label: Strings.txtMenuRewardHistory
    },
    {
        id: 7,
        iconOn: Images.tabIconInvoiceOn,
        iconOff: Images.tabIconInvoiceOff,
        name: Strings.txtPackageAndInvoice,
        label: Strings.txtMenuPackageInvoice
    },
    {
        id: 9,
        iconOn: Images.tabIconBannerOn,
        iconOff: Images.tabIconBannerOff,
        name: Strings.txtBanner,
        label: Strings.txtMenuBanner
    },

    {
        id: 11,
        iconOn: Images.tabIconBroadcastOn,
        iconOff: Images.tabIconBroadcastOff,
        name: Strings.txtBroadcast,
        label: Strings.txtMenuBroadcast
    },
    {
        id: 10,
        iconOn: Images.tabIconThemeOn,
        iconOff: Images.tabIconThemeOff,
        name: Strings.txtThemeSetting,
        label: Strings.txtMenuThemeSetting
    },
    {
        id: 12,
        iconOn: Images.tabIconReportOn,
        iconOff: Images.tabIconReportOff,
        name: Strings.txtReport,
        label: Strings.txtMenuReport
    },
]
export default {
    payorAdminMenu: payorAdminMenu,
    payorAdminTitle: "MENU",
    superAdminMenu: superAdminMenu,
    superAdminTitle: "MENU"
}