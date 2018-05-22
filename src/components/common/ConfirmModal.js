import React, {Component} from 'react';
import {View, Text, Modal, TouchableHighlight} from 'react-native';
import {Button} from './Button'
import {CardSection} from './CardSection'

const ConfirmModal = ({visible, text, onYesClick, onNoClick}) => {
    return(
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection style={styles.cardSectionStyle}>
                        <Text style={styles.textStyle}>{text}</Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={onYesClick}> Yes </Button>
                        <Button onPress={onNoClick}> No </Button>
                    </CardSection>
                </View>
            </Modal>
    )
}

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18, 
        textAlign: 'center', 
        lineHeight: 30
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

export {ConfirmModal};