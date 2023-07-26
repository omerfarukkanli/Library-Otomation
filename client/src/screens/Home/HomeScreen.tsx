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
import Modal from 'react-native-modal'; // Burada ekledik
import styles from './HomeScreen.style';
import AddBookModal from '../../components/AddBookModal/AddBookModal';
import AddBookButton from '../../components/AddBookModal/AddBookButton';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch<AppDispatch>();
  const book = useSelector((state: RootState) => state.bookReducer.allBookState) as IBookRes[];
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataList, setDataList] = useState<IBookRes[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const user = useSelector((state: RootState) => state.userReducer.userState);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState<boolean>(false); // Özel modal için state

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  useEffect(() => {
    setDataList(book);
  }, [book]);

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
    setFilterModalVisible(true); // Modalı göstermek için state'i güncelliyoruz
  };

  const handleFilterDismiss = () => {
    setFilterModalVisible(false); // Modal kapandığında bu fonksiyon çalışacak ve state'i güncelleyecek
  };

  const handleGenreSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres((prevGenres) => prevGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres((prevGenres) => [...prevGenres, genre]);
    }
  };

  const clearSelectedGenres = () => {
    setSelectedGenres([]);
  };

  const filterBooks = (books: IBookRes[]) => {
    if (selectedGenres.length === 0) {
      return books;
    } else {
      return books.filter((book) => selectedGenres.includes(book.genre!));
    }
  };

  useEffect(() => {
    const filteredBooks = filterBooks(book);
    setDataList(filteredBooks);
  }, [book, selectedGenres]);

  const renderItem = ({ item }: { item: IBookRes }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View style={{ marginTop: 30, marginRight: 5, marginLeft: 5 }}>
        <View style={styles.bookCOntainer}>
          <Image source={{ uri: item.coverImage }} style={styles.ımage} resizeMode="contain" />
          <View style={{ alignItems: 'flex-start', width: '100%' }}>
            <Text style={styles.bookText} numberOfLines={2}>
              Kitap Adı:
              <Text style={styles.bookTextTitle}>{item.title}</Text>
            </Text>
            <Text style={styles.bookText}>
              Tür:
              <Text style={styles.bookTextTitle}>{item.genre}</Text>
            </Text>
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
      <View style={styles.selectedGenresContainer}>
        {selectedGenres.length > 0 && (
          <>
            <Text style={styles.selectedGenresText}>Seçili Türler:</Text>
            {selectedGenres.map((genre) => (
              <Text key={genre} style={styles.selectedGenre}>
                {genre}
              </Text>
            ))}
            <TouchableOpacity onPress={clearSelectedGenres} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Temizle</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <FlatList
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        data={dataList}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'flex-start' }}
        showsVerticalScrollIndicator={false}
      />

      {/* Özelleştirilmiş Modal */}
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={handleFilterDismiss}
        style={{ margin: 0 }}
        backdropOpacity={0.7} // Modal dışına tıklanabilirlik opaklığı
      >
        <View style={{ backgroundColor: 'white', maxHeight: 400, borderRadius: 8 }}>
          <FlatList
            data={book}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleGenreSelect(item.genre!)} style={styles.genreItem}>
                <Text>{item.genre}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.genre!.toString()}
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
