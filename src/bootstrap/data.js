const dataSource = ['item1', 'item2', 'item3', 'item4', 'item5'];

export const getDummyData = () => {

    const dummyData = [];

    dataSource.map((item, index) => {
        return dummyData.push({
            name: item,
            category: 'category ' + index,
            store: 'store' + index,
            day: dataSource.length - index
        })
    });
    return dummyData
};
