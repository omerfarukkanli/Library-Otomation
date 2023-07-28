import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';
import { clearBookError, getAllBooks } from '../../features/bookSlice';
import { IBookRes } from '../../api/book.api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Modal from 'react-native-modal';
import styles from './HomeScreen.style';
import AddBookModal from '../../components/AddBookModal/AddBookModal';
import AddBookButton from '../../components/AddBookModal/AddBookButton';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userReducer.userState);
  const book = useSelector((state: RootState) => state.bookReducer.allBookState) as IBookRes[];
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataList, setDataList] = useState<IBookRes[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([])
  const [isFilterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    const filteredBooks = filterBooks(book);
    setDataList(filteredBooks);
  }, [book, genre]);

  const handlePress = () => {
    if (user !== null) {
      setIsVisible(!isVisible);
      dispatch(clearBookError());
    } else {
      Alert.alert('Lütfen giriş yapınız');
    }
  };

  const searchBooks = (searchText: string) => {
    const filteredData = book.filter((item) => {
      const lowercaseSearchText = searchText.toLowerCase();
      const lowercaseTitle = item.title!.toLowerCase();
      const lowercaseGenre = item.genre!.toLowerCase();

      return lowercaseTitle.includes(lowercaseSearchText) || lowercaseGenre.includes(lowercaseSearchText);
    });

    setDataList(filteredData);
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);

    if (text === '') {
      setDataList(book);
    } else {
      searchBooks(text);
    }
  };

  const handleToShortPress = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    const sortedData = [...dataList].sort((a, b) => {
      const titleA = a.title!.toLowerCase();
      const titleB = b.title!.toLowerCase();

      if (sortOrder === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    setDataList(sortedData);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
    const genresArray: string[] = book.map((book: IBookRes) => book.genre!)
    setGenres([...new Set(genresArray)])
  };
  
  const filterBooks = (books: IBookRes[]) => {
    if (genre === "") return books;
    else {
      return books.filter((book) => genre.includes(book.genre!));
    }
  };
  const renderItem = ({ item }: { item: IBookRes }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)} style={{ width: "50%" }}>
      <View style={{ width: "100%" }}>
        <View style={styles.bookCOntainer}>
          <Image source={{ uri: item.coverImage }} style={styles.ımage} resizeMode="contain" />
          <View style={styles.bookTextContainer}>
            <Text style={styles.bookTextTitle}>{item.title}</Text>
            <Text style={styles.bookTextGenre}>{item.genre}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleBookPress = (book: IBookRes) => {
    navigation.navigate('Bookdetail', { book });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <AddBookModal isVisible={isVisible} onClose={handlePress} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Ara..."
          style={styles.Search}
          value={searchText}
          onChangeText={handleChangeText}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Text style={styles.filterContainertext}>Filtrele</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toShortButton} onPress={handleToShortPress}>
          <Text style={styles.filterContainertext}>Sırala</Text>
        </TouchableOpacity>
      </View>
      {
        genre === "" ? (
          <View></View>
        ) :
          (<View style={styles.selectedGenresContainer}>
            <Text style={styles.selectedGenresText}>Seçili Tür:</Text>
            <Text style={styles.selectedGenre}>
              {genre}
            </Text>
            <TouchableOpacity onPress={() => setGenre("")} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Temizle</Text>
            </TouchableOpacity>
          </View>
          )
      }
      <FlatList
        data={dataList}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={() => setFilterModalVisible(false)}
        style={{ margin: 0 }}
      >
        <View style={{ backgroundColor: 'white', maxHeight: 400, borderRadius: 8 }}>
          <FlatList
            data={genres}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.genreItem} onPress={() => {
                setGenre(item)
                setFilterModalVisible(false);
              }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={{ margin: 16 }}
          />
        </View>
      </Modal>

      <View style={{ alignItems: 'center', margin: 5, position: 'absolute', bottom: 15, right: 15 }}>
        <AddBookButton onPress={handlePress} />
      </View>
    </View>
  );
};

export default HomeScreen;