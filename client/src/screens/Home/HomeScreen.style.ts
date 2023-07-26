import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bookCOntainer: {
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
        marginLeft: 5,
        marginRight: 5,
    },
    ımage: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    bookText: {
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 12
    },
    bookTextTitle: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    Search: {
        height: "100%",
        backgroundColor: "darksalmon",
        borderRadius: 10,
        width: "80%",
        paddingLeft: 10,
        padding: 3,
        color: "white",
    },
    searchContainer: {
        height: 55,
        backgroundColor: "navajowhite",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 10,
        flexDirection: "row",
    },

    dropdownContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    dropdownLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    dropdown: {
        flex: 1,
        backgroundColor: "lightgray",
        borderRadius: 5,
    },
    filterContainer: {
        height: 40,
        borderTopWidth: 1,
        borderColor: "tomato",
        backgroundColor: "navajowhite",
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
    },
    filterButton: {
        width: "50%",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "tomato",
        alignItems: "center",
        justifyContent: "center",
    },
    toShortButton: {
        borderBottomWidth: 1,
        borderColor: "tomato",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    filterContainertext: {
        color: "tomato",
        fontWeight: "bold"
    },
    selectedGenresContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
      },
      selectedGenresText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
      },
      selectedGenre: {
        backgroundColor: '#d3d3d3',
        color: '#333',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 5,
      },
      clearButton: {
        backgroundColor: '#ff4500',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      genreItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
})

