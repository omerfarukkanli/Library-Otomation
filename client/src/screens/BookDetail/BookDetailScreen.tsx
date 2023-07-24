import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../types";
import styles from "./Book.Detail.style"
import AddBookInput from '../../components/AddBookModal/AddBookInput';
import { IBook, IBookRes } from '../../api/book.api';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { deleteBook, getAllBooks, updateBook } from '../../features/bookSlice';
import { StackNavigationProp } from '@react-navigation/stack';


type BookDetailScreenRouteProp = RouteProp<RootStackParamList, 'Bookdetail'>;

interface BookDetailScreenProps {
    route: BookDetailScreenRouteProp;
}

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>()
    const book = route.params?.book ?? null;
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState(book?.title ?? '');
    const [authors, setAuthors] = useState<string[]>(book?.authors ?? []);
    const [isbn, setIsbn] = useState(book?.isbn ?? '');
    const [genre, setGenre] = useState(book?.genre ?? '');
    if (!book) {
        return <Text>Loading...</Text>;
    }
    const handleRemoveAuthor = (index: number) => {
        if (authors.length < 2) {
            Alert.alert("En az bir yazar olmalı !")
        }
        else {
            console.log(authors.length)
            const updatedAuthors = [...authors];
            updatedAuthors.splice(index, 1);
            setAuthors(updatedAuthors);
        }
    };

    const handleAddAuthor = () => {
        if (author.trim() !== '') {
            setAuthors([...authors, author.trim()]);
            setAuthor('');
        }
    }

    const updatePressHandle = async () => {
        const updateBookData: IBookRes = {
            title: title,
            authors: authors,
            isbn: isbn,
            genre: genre,
            coverImage: book.coverImage
        }
        const updateBookRedux = await dispatch(updateBook({ id: book._id ?? "", book: updateBookData }));
        if (updateBookRedux.meta.requestStatus === "fulfilled") {
            dispatch(getAllBooks());
            navigation.navigate("Home")
        }
    }
    const deletePressHandle = async () => {
        const deleteItem = await dispatch(deleteBook(book._id as string));
        if (deleteItem.meta.requestStatus === "fulfilled") {
            dispatch(getAllBooks());
            navigation.navigate("Home")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={{ uri: book.coverImage }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <View style={styles.bookContainer}>
                        <Text style={styles.bookContainerText}>Kitap Adı</Text>
                        <AddBookInput value={title} onChangeText={setTitle} width='80%' />
                    </View>
                    <View style={styles.bookContainer}>
                        <Text style={styles.bookContainerText}> ISBN</Text>
                        <AddBookInput value={isbn} onChangeText={setIsbn} width='80%' />
                    </View>
                    <View style={styles.bookContainer}>
                        <Text style={styles.bookContainerText}>Tür</Text>
                        <AddBookInput value={genre} onChangeText={setGenre} width='80%' />
                    </View>
                    <View style={styles.authorContainer}>
                        <Text style={styles.bookContainerText}>Yazar Ekle</Text>
                        <AddBookInput value={author} onChangeText={setAuthor} width='55%' placeholder='Yazar Ekle' />
                        <TouchableOpacity style={styles.authorsAddButton}>
                            <Text style={styles.authorsAddButtonText} onPress={handleAddAuthor}>EKLE</Text>
                        </TouchableOpacity>
                    </View>
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
                    <TouchableOpacity style={styles.buttonStyle} onPress={updatePressHandle}>
                        <Text style={styles.buttonTextStyle}>GÜNCELLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={deletePressHandle}>
                        <Text style={styles.buttonTextStyle}>SİL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};

export default BookDetailScreen;
