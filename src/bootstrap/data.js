const doaData = {
    'Zuivel': ['melk', 'boter', 'roomboter', 'Mini Chocomel halfvol', 'ei', 'slagroom', 'Optimal kwark', 'creme fraiche'],
    'Vlees': ['gehakt, kipfillet', 'kippedij', 'hamblokjes', 'spekblokjes', 'draadjesvlees', 'blinde vink', 'schnitzel', 'varkenshaals', 'katenspek', 'worst', 'hamburger', 'spareribs'],
    'Groenten': ['groentenpakket', 'champignons', 'ui', 'aardappels', 'boerenkool', 'savooiekool', 'paprika', 'broccoli', 'geschrapte worteltjes', 'tomaten', 'haricots verts', 'boontjes', 'wortels'],
    'Fruit': ['appels', 'mandarijnen', 'citroen', 'snoeptomaatjes', 'aardbeien'],
    'Conserven': ['spinazie', 'erwtjes', 'worteltjes', 'tomatenpuree', 'boerenkool', 'mais', 'rode kool', 'bietjes', 'snijbonen', 'wortels en doperwtjes', 'cappucijners', 'Party Knacks', 'gehaktballetjes in jus', 'hete worstjes'],
    'Drank': ['cola', 'Red bull', 'Slimpie ranja', 'whiskey', 'wodka', 'wijn', 'bruisend water', 'sinasappelsap', 'bier', 'Kasteelbier donker'],
    'Graan producten': ['Cruesli', 'time out', 'Lu breakfast'],
    'Snacks': ['chips', 'koekjes', 'bios snacks', 'lion', 'snickers', 'mini chips', 'noten', 'popcorn', 'crackers normaal', 'crackers vinigar', 'pelpindas', 'rijstwafels'],
    'Diepvries': ['sate', 'icecream', 'waterijsjes', 'hamburgers', 'mora snacks', 'Aviko skinny fries', 'bladerdeeg', 'McCain rösti rondjes', 'diepvriesaardappelen', 'aardappelkroketjes'],
    'Soep en Noodles': ['noodles', 'noodlesoep', 'opkikker', 'kippenbouillonblokjes', 'koninginnesoep', 'soep', 'soepstengels', 'soepbolletjes', '', '', '', '', '', '', '', ''],
    'basis': ['instant mash', 'rijst', 'macaroni', 'spaghetti', 'spaghettini', 'bami', 'instant koffie', 'koffie pads', 'thee'],
    'sauzen en kruiden': ['olie', 'Calve sate saus', 'perperroomsaus', 'kerriesaus', 'chilipoeder', 'jus', 'bali boemboe', 'kokosmelk', 'sambal Brandal',
        'kerrie kruiden', 'bami kruiden', 'nasi kruiden', 'cayun kruiden', 'Silvo kipkruiden', 'mayonaise', 'mosterd', 'knoflook', 'chili saus', 'gehakt kruiden'],
    'verzorgingsproducten': ['Africa deo', 'douchegel', 'Niveau sensitive aftershave', 'Zwitsal babyshampoo', 'Wilkinson wegwerp scheermesjes', 'scheergel'],
    'huishoudelijke producten': ['wasmiddel kleur', 'wasmiddel zwart', 'Brabantia G', 'papieren zakdoekjes', 'handzeep', 'Glorix doekjes', 'diepvries zakjes', 'Ziplock zakjes',
        'wc blokken', 'toiletpapier', 'keukenrol', 'diepvrieszakken', 'Bio-tex handwas', 'elastiekjes', 'batterijen'],
};

export const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];
export const newDoaData = {
    category1: {
        name: 'Zuivel',
        items: ['melk', 'boter', 'roomboter', 'Mini Chocomel halfvol', 'ei', 'slagroom', 'Optimal kwark', 'creme fraiche'],
        color: '#ffffff',
        textColorIsBlack: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/1280px-Cow_female_black_white.jpg',
    },
    category2: {
        name: 'Vlees',
        items: ['gehakt, kipfillet', 'kippedij', 'hamblokjes', 'spekblokjes', 'draadjesvlees',
            'blinde vink', 'schnitzel', 'varkenshaas', 'katenspek', 'worst', 'hamburger', 'spareribs'],
        color: '#782119',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BBQ_Food.jpg/1280px-BBQ_Food.jpg',

    },
    category3: {
        name: 'Groenten',
        items: ['groentenpakket', 'champignons', 'ui', 'aardappels', 'boerenkool', 'savooiekool', 'paprika', 'broccoli',
            'geschrapte worteltjes', 'tomaten', 'haricots verts', 'boontjes', 'wortels'],
        color: '#1b4a1c',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Supermarkt.jpg',
    },
    category4: {
        name: 'Fruit',
        items: ['appels', 'mandarijnen', 'citroen', 'snoeptomaatjes', 'aardbeien'],
        color: '#14e610',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/220px-Culinary_fruits_front_view.jpg',
    },
    category5: {
        name: 'Conserven',
        items: ['spinazie', 'erwtjes', 'worteltjes', 'tomatenpuree', 'boerenkool', 'mais', 'rode kool',
            'bietjes', 'snijbonen', 'wortels en doperwtjes', 'cappucijners', 'Party Knacks', 'gehaktballetjes in jus', 'hete worstjes'],
        color: '#616362',
        textColorIsBlack: false,
        image: 'https://resize.hswstatic.com/w_907/gif/canned-food.jpg',
    },
    category6: {
        name: 'Drank',
        items: ['cola', 'Red bull', 'Slimpie ranja', 'whiskey', 'wodka', 'wijn', 'bruisend water', 'sinasappelsap', 'bier', 'Kasteelbier donker'],
        color: '#2a9ac7',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Softdrinks_in_supermarket.jpg/1280px-Softdrinks_in_supermarket.jpg',
    },
    category7: {
        name: 'Graan producten',
        items: ['Cruesli', 'time out', 'Lu breakfast'],
        color: '#c7a22a',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Work_dough.jpg',
    },
    category8: {
        name: 'Snacks',
        items: ['chips', 'koekjes', 'bios snacks', 'lion', 'snickers', 'mini chips', 'noten', 'popcorn', 'crackers normaal', 'crackers vinigar', 'pelpindas', 'rijstwafels'],
        color: '#ebd93d',
        textColorIsBlack: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/SnackfoodRackDF.JPG/800px-SnackfoodRackDF.JPG',
    },
    category9: {
        name: 'Diepvries',
        items: ['sate', 'icecream', 'waterijsjes', 'hamburgers', 'mora snacks', 'Aviko skinny fries', 'bladerdeeg', 'McCain rösti rondjes', 'diepvriesaardappelen', 'aardappelkroketjes'],
        color: '#90aede',
        textColorIsBlack: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Superstorewinkler4.JPG/1280px-Superstorewinkler4.JPG',
    },
    category10: {
        name: 'Soep en Noodles',
        items: ['noodles', 'noodlesoep', 'opkikker', 'kippenbouillonblokjes', 'koninginnesoep', 'soep', 'soepstengels', 'soepbolletjes'],
        color: '#f72419',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Wok_cooking.jpg',
    },
    category11: {
        name: 'Basis',
        items:  ['instant mash', 'rijst', 'macaroni', 'spaghetti', 'spaghettini', 'bami', 'instant koffie', 'koffie pads', 'thee'],
        textColorIsBlack: false,
        color: '#f5790c',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White%2C_Brown%2C_Red_%26_Wild_rice.jpg/1280px-White%2C_Brown%2C_Red_%26_Wild_rice.jpg',
    },
    category12: {
        name: 'sauzen en kruiden',
        items:  ['olie', 'Calve sate saus', 'perperroomsaus', 'kerriesaus', 'chilipoeder', 'jus', 'bali boemboe', 'kokosmelk', 'sambal Brandal',
            'kerrie kruiden', 'bami kruiden', 'nasi kruiden', 'cayun kruiden', 'Silvo kipkruiden', 'mayonaise', 'mosterd', 'knoflook', 'chili saus', 'gehakt kruiden'],
        color: '#f0ec1f',
        textColorIsBlack: true,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Spices1.jpg/1280px-Spices1.jpg',
    },
    category13: {
        name: 'verzorgingsproducten',
        items: ['Africa deo', 'douchegel', 'Niveau sensitive aftershave', 'Zwitsal babyshampoo', 'Wilkinson wegwerp scheermesjes', 'scheergel'],
        color: '#012d63',
        textColorIsBlack: false,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Crema_para_afeitar.JPG/1280px-Crema_para_afeitar.JPG',
    },
    category14: {
        name: 'huishoudelijke producten',
        items: ['wasmiddel kleur', 'wasmiddel zwart', 'Brabantia G', 'papieren zakdoekjes', 'handzeep', 'Glorix doekjes', 'diepvries zakjes', 'Ziplock zakjes',
            'wc blokken', 'toiletpapier', 'keukenrol', 'diepvrieszakken', 'Bio-tex handwas', 'elastiekjes', 'batterijen'],
        textColorIsBlack: false,
        color: '#8610e6',
        image: 'https://wujiproductions.com/wp-content/uploads/2019/01/cleaning-products-stock-today-160307-tease_4097ed238bc46047a15831a86dd47267-1140x642.jpg',
    }
};

export const getDoaData = () => {
    const allData = [];
    for (let category in newDoaData) {
        console.log (newDoaData[category]);
        const categoryData = newDoaData[category];
       categoryData.items.map((item) => {
            const itemData = {
                amount: '',
                name: item,
                category: categoryData.name,
                store: '',
                day: '',
                mustBuy: false,
                imageUrl: categoryData.image || 'https://upload.wikimedia.org/wikipedia/commons/1/13/Supermarkt.jpg',
                color: categoryData.color,
                textColorIsBlack: categoryData.textColorIsBlack
            };
            allData.push(itemData)
        })
    }
    return allData;
};