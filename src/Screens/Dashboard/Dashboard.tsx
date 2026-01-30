import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import actions from '../../zustand/actions';
import { APP_LOG, errorMethod } from '../../utils/helperFunctions';
import AlbumCard from '../../Components/AlbumCard';
import { useAlbumStore } from '../../zustand/albums';
import navigationStrings from '../../constants/navigationStrings';

export default function Dashboard(route: any) {
  const { navigation } = route;
  const albumsList = useAlbumStore(state => state.albumsList);

  useEffect(() => {
    getListOfAlbums();
  }, []);

  const getListOfAlbums = async () => {
    let url = `?term=jack+johnson`;
    try {
      await actions.getAlbumList(url);
    } catch (error) {
      APP_LOG(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={albumsList}
        renderItem={({ item }) => (
          <AlbumCard
            item={item}
            onPress={() =>
              navigation.navigate(navigationStrings.ALBUM_DETAILS, {
                item: item,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
