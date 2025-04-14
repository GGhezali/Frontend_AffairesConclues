        <View title="Annonce" style={styles.annonce} onPress={() => navigation.navigate("Annonce")} >
          <Text style={styles.titre}>Titre de l'annonce</Text>
          <Image style={styles.picture}/>
        </View>

annonce: {
    height: 300,
    width: 170,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
  },
  titre: {
    textAlign: "center",
    marginBottom: 10,
  },
  picture: {
    backgroundColor: "grey",
    width: "100%",
    height: "50%"
  },