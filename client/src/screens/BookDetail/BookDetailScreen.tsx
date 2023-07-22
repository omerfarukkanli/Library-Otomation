import React from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type BookDetailScreenRouteProp = RouteProp<RootStackParamList, 'Bookdetail'>;

interface BookDetailScreenProps {
    route: BookDetailScreenRouteProp;
}

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route }) => {
    const book = route.params?.book ?? null;

    if (!book) {
        return <Text>Loading...</Text>;
    }
    return (
        <View>
            <Image
                source={{ uri: book.coverImage }}
                style={{ width: 200, height: 300 }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{book.title}</Text>
            <Text style={{ fontSize: 18 }}>{book.authors.join(", ")}</Text>
            <Text style={{ fontSize: 18 }}>{book.genre}</Text>
            <Text style={{ fontSize: 18 }}>{book.isbn}</Text>
        </View>
    );
};

export default BookDetailScreen;
