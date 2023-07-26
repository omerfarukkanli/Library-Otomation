import { Alert, ScrollView, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal"
import styles from "./styles/Modal.style"
import AddBookInput from './AddBookInput'
import { IBook } from '../../api/book.api'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, getAllBooks } from '../../features/bookSlice'
import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system"
import ErrorText from '../ErrorText/ErrorText'
interface IProps {
    isVisible: boolean;
    onClose: () => void
}

const AddBookModal: React.FC<IProps | any> = ({ isVisible, onClose }) => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>()
    const selectError = useSelector((state: RootState) => state.bookReducer.error);
    const user = useSelector((state: RootState) => state.userReducer.userState);
    const [authors, setAuthors] = useState<string[]>([])
    const [bookName, setBookName] = useState("")
    const [isbn, setIsbn] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")

    const [base64Data, setBase64Data] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleAddAuthor = () => {
        if (author.trim() !== '') {
            setAuthors([...authors, author.trim()]);
            setAuthor('');
        }
    }

    const handleRemoveAuthor = (index: number) => {
        const updatedAuthors = [...authors];
        updatedAuthors.splice(index, 1);
        setAuthors(updatedAuthors);
    };

    const handleImageSelect = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('İzin reddedildi Resim seçmek için izin vermelisiniz!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                base64: true
            });

            if (!result.canceled) {
                const fileType = await getFileInfo(result.assets[0].uri)
                const base64 = `data:image/${fileType};base64,${result.assets[0].base64}`
                setBase64Data(base64)
                setIsImageLoaded(true);
            }
        } catch (error) {
            console.log('Resim seçme hatası:', error);
        }
    };
    const getFileInfo = async (fileURI: string) => {
        try {
            const fileInfo = await FS.getInfoAsync(fileURI);
            if (fileInfo.exists) {
                const extension = fileInfo.uri.split('.').pop();
                return extension;
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }
    const handleImageClear = () => {
        setBase64Data('');
        setIsImageLoaded(false);
    };

    const handlePressButton = async () => {
        const bookData: IBook = {
            title: bookName,
            isbn: isbn,
            authors: authors,
            genre: genre,
            image: base64Data
        }
        const user = await dispatch(addBook(bookData));
        if (user.meta.requestStatus === "fulfilled") {
            onClose();
            dispatch(getAllBooks());
            setAuthors([]);
            setBookName("");
            setGenre("");
            setIsbn("");
            setIsImageLoaded(false);
            setBase64Data("")
        }
    }

    return (
        <Modal isVisible={isVisible} style={styles.modalContainer} onBackdropPress={onClose} >
            <View style={styles.innerContainer}>
                <ErrorText text={selectError} />
                <View style={styles.textContainer}>
                    <AddBookInput placeholder='Kitap Adı' value={bookName} onChangeText={setBookName} />
                    <AddBookInput placeholder='ISBN en az 9 hane olmalı' value={isbn} onChangeText={setIsbn} />
                    <AddBookInput placeholder='Tür' value={genre} onChangeText={setGenre} />
                    <View style={styles.authorsContainer}>
                        <AddBookInput placeholder='Yazarlar' value={author} onChangeText={setAuthor} width='70%' />
                        <TouchableOpacity style={styles.authorsAddButton} onPress={handleAddAuthor}>
                            <Text style={styles.authorsAddButtonText}>EKLE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.authorsList}>
                        <Text style={styles.bookContainerText}>Yazarlar</Text>
                        <ScrollView>
                            {authors.map((author, index) => (
                                <View style={styles.authorItem} key={index}>
                                    <Text style={styles.authorText}>{author}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveAuthor(index)}>
                                        <Text style={styles.removeIcon}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        {!isImageLoaded ? (
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleImageSelect}>
                                <Text style={styles.buttonTextStyle}>RESİM EKLE</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttonStyle} onPress={handleImageClear}>
                                <Text style={styles.buttonTextStyle}>RESİMİ SİL</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.buttonStyle} onPress={handlePressButton}>
                            <Text style={styles.buttonTextStyle}>KAYDET</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddBookModal