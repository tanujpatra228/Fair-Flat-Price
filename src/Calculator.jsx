import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import InfoContent from './components/InfoContent';
import InfoSheet from './components/InfoSheet';

const Calculator = ({isConnected}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [carpetArea, setCarpetArea] = useState(1000);
    const [carpetAreaRate, setCarpetAreaRate] = useState(6000);
    const [superBuiltUpArea, setsuperBuiltUpArea] = useState(2000);
    const [rateOfLand, setRateOfLand] = useState(10000);
    const [totalFlats, setTotalFlats] = useState(10);
    const [infoSheet, setInfoSheet] = useState({isVisible: false, content: {}});
    const [constructionQualityRate, setConstructionQualityRate] = useState(1200);

    const calculatedSuperBuiltUpAreaRate = useMemo(() => {
        return ((carpetAreaRate * carpetArea) / superBuiltUpArea).toFixed(2) || 0
    }, [carpetArea, carpetAreaRate, superBuiltUpArea]);

    const calculatedLandRateForOneFlat = useMemo(() => {
        const amount = totalFlats > 0 ? (rateOfLand / totalFlats) : 0;
        return amount.toFixed(2);
    }, [rateOfLand, totalFlats]);

    const netCost = useMemo(() => {
        const netCostNumber = parseFloat(constructionQualityRate) + parseFloat(calculatedLandRateForOneFlat);
        return netCostNumber.toFixed(2);
    }, [constructionQualityRate, calculatedLandRateForOneFlat]);

    const premium = useMemo(() => {
        const premiumNumber = (parseFloat(calculatedSuperBuiltUpAreaRate) - parseFloat(netCost)) || 0;
        return premiumNumber.toFixed(2);
    }, [calculatedSuperBuiltUpAreaRate, netCost]);

    const premiumPercentage = useMemo(() => {
        const percentage = ((calculatedSuperBuiltUpAreaRate - netCost) / netCost) * 100 || 0;
        return percentage.toFixed(2);
    }, [calculatedSuperBuiltUpAreaRate, netCost]);

    const openInfoSheet = (key = '') => {
        let content = {};
        switch (key) {
            case 'SBUA':    // Super Built Up Area
                content = {
                    title: 'Super Built Up Area',
                    description: `A super Built-up area covers the built-up area of the apartment and common share areas such as lift lobbies, staircase, common entrances, play areas, storage space, parking areas, etc. You can ask for this from builder`,
                    video: 'https://youtu.be/qCMFlfBTWks?si=1JTpDqhlAkyjGxKb&t=161',
                    videoId: 'qCMFlfBTWks',
                    timestamp: 161,
                    imagePath: '../assets/super-built-up-area.webp'
                };
                break;
        
            case 'CQ':  // Construction Quality
                content = {
                    title: 'Construction Quality',
                    description: `Try to get this amount from the builder, also consider if the builder has done some basic interior / furnishing. --As a thumbrule: --For Avg./Decent Construction Quality you can consider ~₹1200/sq.ft --For Premium Quality (let's say Italian Marble in kitchen) you can consider ~₹1500/sq.ft --For Premium Quality + Basic Interior you can consider ~₹1800/sq.ft`,
                    video: 'https://youtu.be/qCMFlfBTWks?si=W4PqsMF2O-xwMzcp&t=310',
                    videoId: 'qCMFlfBTWks',
                    timestamp: 310,
                    imagePath: '../assets/construction-quality.webp'
                };
                break;
        
            case 'LR':  // Land Rate
                content = {
                    title: 'Land Rate',
                    description: 'You can get this amount from local property dealers, Consider the highest per sq.ft rate that you come to know (to be really safe you can assume 5-10% more then the highest per sq.ft rate that you come to know) --Whatever the Rate of Land is, divide it by the number of flats built above the piece of land --For Example if the Rate of Land is ₹10,000 and there is 1 flat on each floor and there is 10 floor, then ₹10,000 / 10 = ₹1000 per flat',
                    video: 'https://youtu.be/qCMFlfBTWks?si=Ldl1mFjUTlwJsKEQ&t=376',
                    videoId: 'qCMFlfBTWks',
                    timestamp: 376,
                    imagePath: '../assets/land-price-per-flat.webp'
                };
            default:
                break;
        }
        setInfoSheet({
            isVisible: true,
            content: content
        });
    }

    const closeInfoSheet = () => {
        setInfoSheet({
            isVisible: false,
            content: {}
        });
    }

    return (
        <>
            {/* Super Built Up Area */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>Rate of Super Built Up Area: ₹{calculatedSuperBuiltUpAreaRate}</Text>
                    <TouchableOpacity style={styles.infoBtn} onPress={() => openInfoSheet('SBUA')}><Text style={[styles.infoBtnText, {color: isDarkMode ? Colors.light : Colors.dark} ]}>i</Text></TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>Total Carpet Area</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='1000'
                            onChangeText={setCarpetArea}
                            value={`${carpetArea}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>sq.ft</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>Rate of Carpet Area</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='6000'
                            onChangeText={setCarpetAreaRate}
                            value={`${carpetAreaRate}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>₹ per sq.ft</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>Super Built Up Area</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='2000'
                            onChangeText={setsuperBuiltUpArea}
                            value={`${superBuiltUpArea}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>sq.ft</Text>
                    </View>
                </View>
            </View>

            {/* Construction Quality */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>Construction Quality: ₹{constructionQualityRate.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.infoBtn} onPress={() => openInfoSheet('CQ')}><Text style={[styles.infoBtnText, {color: isDarkMode ? Colors.light : Colors.dark} ]}>i</Text></TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>Rate</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='1000'
                            onChangeText={setConstructionQualityRate}
                            value={`${constructionQualityRate}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>₹ per sq.ft</Text>
                    </View>
                </View>
            </View>

            {/* Land Rate */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>Rate of Land for 1 Flat: ₹{calculatedLandRateForOneFlat}</Text>
                    <TouchableOpacity style={styles.infoBtn} onPress={() => openInfoSheet('LR')}><Text style={[styles.infoBtnText, {color: isDarkMode ? Colors.light : Colors.dark} ]}>i</Text></TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>Local Rate of Land</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='1000'
                            onChangeText={setRateOfLand}
                            value={`${rateOfLand}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>₹ per sq.ft</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? Colors.white : Colors.dark }]}>Total No. of Flats</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='10'
                            onChangeText={setTotalFlats}
                            value={`${totalFlats}`}
                            style={[styles.input, { color: isDarkMode ? Colors.light : Colors.dark }]}
                        />
                        {/* <Text>₹ per sq.ft</Text> */}
                    </View>
                </View>
            </View>

            {/* Net Cost */}
            <View style={styles.finalValueContainer}>
                <View style={styles.finalValueWrapper}>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.white : Colors.black }]}>Asking Price (₹)</Text>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>{calculatedSuperBuiltUpAreaRate}</Text>
                </View>
                <View style={styles.finalValueWrapper}>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>Net Cost (₹)</Text>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>{netCost}</Text>
                </View>
                <View style={styles.finalValueWrapper}>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>Premium (₹)</Text>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>{premium}</Text>
                </View>
                <View style={styles.finalValueWrapper}>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>Premium (%)</Text>
                    <Text style={[styles.finalValue, { color: isDarkMode ? Colors.light : Colors.dark }]}>{premiumPercentage}</Text>
                </View>
                <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>(* approx assumption of per sq.ft)</Text>
            </View>

            <InfoSheet 
                isVisible={infoSheet.isVisible}
                closeModal={closeInfoSheet}
            >
                <InfoContent content={infoSheet.content} isConnected={isConnected} />
            </InfoSheet>
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
        paddingBottom: 40,
        paddingTop: 4,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC50',
    },
    sectionTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    inputContainer: {
        marginTop: 6
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#CCCCCC10',
        borderRadius: 8,
        paddingRight: 8,
        paddingLeft: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
    },
    input: {
        width: 230,
        height: 40,
    },
    infoBtn: {
        width: 20,
        height: 20,
        backgroundColor: '#EEEEEE50',
        textAlign: 'center',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBtnText: {
        fontSize: 14,
        fontWeight: '800',
        fontStyle: 'italic',
    },
    finalValueContainer: {
        backgroundColor: '#EFEFEF30',
        padding: 16,
        borderRadius: 8
    },
    finalValueWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF70',
        marginBottom: 12
    },
    finalValue: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
});

export default Calculator;
