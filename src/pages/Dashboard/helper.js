import { Strings } from '../../constants';
export function constructMCUInfo(data) {
    if(!data) return null;
    var mcuInfo = {}
    Object.keys(data).forEach(key => {
        let item = data[key];
        let itemData = {
            total: item.greenCount + item.yellowCount + item.redCount,
            params: [
                {
                    title: Strings.txtBad,
                    value: item.redCount,
                    color: '#E05853'
                },
                {
                    title: Strings.txtMedium,
                    value: item.yellowCount,
                    color: '#FFD230'
                },
                {
                    title: Strings.txtGood,
                    value: item.greenCount,
                    color: '#8DCF56'
                },
            ]
        }
        mcuInfo[key] = itemData;

    })
    console.log("mcuInfo", mcuInfo)
    return mcuInfo;
}
  
