import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
        width: '100%',
        height: 300,
    },

    displayValue: {
        fontSize: 70,
        color: '#fff',
    }
})

export default props => 
    <View style={styles.display}>
        <Text style={styles.displayValue} numberOfLines={1}>
            {props.value}
        </Text>
    </View>
