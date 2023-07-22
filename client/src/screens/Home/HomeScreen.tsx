import { View, Text, Button, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import AddBookButton from "../../components/AddBookModal/AddBookButton";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../features/bookSlice";
import { IBookRes } from "../../api/book.api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import styles from "./HomeScreen.style"
const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>();
    const book = useSelector((state: RootState) => state.bookReducer.bookState) as IBookRes[];
    console.log(book);
    const [isVisible, setİsVisiable] = useState<boolean>(false);
    const [dataList, setDataList] = useState<IBookRes[]>([]);

    useEffect(() => {
        dispatch(getAllBooks());
        setDataList(book);
    }, [book]);
    const handlePress = () => {
        setİsVisiable(!isVisible);
    };


    const renderItem = ({ item }: { item: IBookRes }) => (
        <TouchableOpacity onPress={() => handleBookPress(item)}>
            <View style={{ marginTop: 30, marginRight: 5, marginLeft: 5 }} >
                <View style={styles.bookCOntainer}>
                    <Image
                        source={{ uri: item.coverImage }}
                        style={styles.ımage}
                    />
                    <View style={{ alignItems: "flex-start", width: "100%" }}>
                        <Text style={styles.bookText}>
                            Kitap Adı:
                            <Text style={styles.bookTextTitle}>
                                {item.title}
                            </Text>
                        </Text>
                        <Text style={styles.bookText}>
                            Tür:
                            <Text style={styles.bookTextTitle}>
                                {item.genre}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );

    const handleBookPress = (book: IBookRes) => {
        navigation.navigate('Bookdetail', { book });
    };

    return (
        <View style={{ flex: 1 }}>
            <AddBookModal isVisible={isVisible} onClose={handlePress} />
            <FlatList
                style={{ marginLeft: "auto", marginRight: "auto" }}
                data={dataList}
                renderItem={renderItem}
                keyExtractor={(item) => item.isbn}
                numColumns={2}
                contentContainerStyle={{ alignItems: "flex-start" }}
                showsVerticalScrollIndicator={false}
            />
            <View style={{ alignItems: "center", margin: 5, position: "absolute", bottom: 15, right: 15 }}>
                <AddBookButton onPress={handlePress} />
            </View>
        </View>
    );
}

export default HomeScreen;
