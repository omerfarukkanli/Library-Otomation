import { Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal"
import styles from "./Modal.style"
import InputText from '../register/InputText';
interface IProps {
    isVisible: boolean;
    onClose: () => void
}

const AddBookModal: React.FC<IProps> = ({ isVisible, onClose }) => {

    const [bookName, setBookName] = useState("")
    const [isbn, setIsbn] = useState("")
    const [authors, setAuthors] = useState("")
    const [genre, setGenre] = useState("")
    return (
        <Modal isVisible={isVisible} style={styles.modalContainer} onBackdropPress={onClose} >
            <View style={styles.innerContainer}>
                <InputText placeholder='Kitap Adı' value={bookName} onChangeText={setBookName} />
                <InputText placeholder='ISBN' value={isbn} onChangeText={setIsbn} />
                <InputText placeholder='Yazarlar' value={authors} onChangeText={setAuthors} />
                <InputText placeholder='Kitap Türü' value={genre} onChangeText={setGenre} />
                <TouchableOpacity onPress={onClose}>
                    <View>
                        <Text>KAYDET</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default AddBookModal