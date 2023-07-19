import { Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal"
import styles from "./styles/Modal.style"
import AddBookInput from './AddBookInput'
import * as ImagePicker from 'expo-image-picker';
import { FileSystem } from 'react-native-unimodules';
import { IBook } from '../../api/book.api'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../store'
import { useDispatch } from 'react-redux'
import { addBook, clearBook } from '../../features/bookSlice'

interface IProps {
    isVisible: boolean;
    onClose: () => void
}

const AddBookModal: React.FC<IProps> = ({ isVisible, onClose }) => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>()

    const [authors, setAuthors] = useState<string[]>([])
    const [bookName, setBookName] = useState("")
    const [isbn, setIsbn] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")

    const [base64Data, setBase64Data] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleAddAuthor = () => {
        if (author.trim() !== '' && authors.length < 3) {
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
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                const base64 = await convertImageToBase64(uri);
                setBase64Data(base64);
                setIsImageLoaded(true);
            }
        } catch (error) {
            console.log('Resim seçme hatası:', error);
        }
    };

    const convertImageToBase64 = async (uri: any) => {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    };

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
            setAuthors([]);
            setBookName("");
            setGenre("");
            setIsbn("");
            setIsImageLoaded(false);
            setBase64Data("")
        }
        else dispatch(clearBook())
    }


    return (
        <Modal isVisible={isVisible} style={styles.modalContainer} onBackdropPress={onClose} >
            <View style={styles.innerContainer}>
                <View style={styles.textCOntainer}>
                    <AddBookInput placeholder='Kitap Adı' value={bookName} onChangeText={setBookName} />
                    <AddBookInput placeholder='ISBN' value={isbn} onChangeText={setIsbn} />
                    <AddBookInput placeholder='Tür' value={genre} onChangeText={setGenre} />
                    <View style={styles.authorsContainer}>
                        <AddBookInput placeholder='Yazarlar' value={author} onChangeText={setAuthor} width='70%' />
                        <TouchableOpacity style={styles.authorsAddButton} onPress={handleAddAuthor}>
                            <Text style={styles.authorsAddButtonText}>EKLE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.authorsList}>
                        {authors.map((author, index) => (
                            <View style={styles.authorItem} key={index}>
                                <Text style={styles.authorText}>{author}</Text>
                                <TouchableOpacity onPress={() => handleRemoveAuthor(index)}>
                                    <Text style={styles.removeIcon}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                {!isImageLoaded ? (
                    <TouchableOpacity style={styles.imageButton} onPress={handleImageSelect}>
                        <View>
                            <Text>RESİM EKLE</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View>
                        <TouchableOpacity style={styles.clearButton} onPress={handleImageClear}>
                            <View>
                                <Text>RESİMİ TEMİZLE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {isImageLoaded && (
                    <View style={styles.checkmark} />
                )}
                <TouchableOpacity onPress={handlePressButton}>
                    <View>
                        <Text>KAYDET</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default AddBookModal