// screens/AlbumDetails.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

export default function AlbumDetails(props: any) {
  const { navigation, params } = props.route;
  const { item } = params;
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const [showVideo, setShowVideo] = useState(false);

  const price =
    item.trackPrice ?? item.collectionPrice ?? item.trackRentalPrice ?? null;

  const description =
    item.longDescription ??
    item.shortDescription ??
    'No description available.';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <FastImage
            source={{
              uri: item.artworkUrl100,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={[styles.image]}
          />
          {item.previewUrl && (
            <View style={{ marginTop: 12 }}>
              {!showVideo ? (
                <TouchableOpacity
                  style={styles.previewButton}
                  onPress={() => setShowVideo(true)}
                >
                  <Text style={styles.previewButtonText}>
                    ▶ Play Video Preview
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.videoContainer}>
                  <Video
                    source={{ uri: item.previewUrl }}
                    style={styles.video}
                    controls
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          )}

          <View style={[styles.infoContainer]}>
            <Text style={styles.title}>{item.trackName}</Text>

            <Text style={styles.artist}>{item.artistName}</Text>

            {item.primaryGenreName && (
              <View style={styles.genreBadge}>
                <Text style={styles.genreText}>{item.primaryGenreName}</Text>
              </View>
            )}

            {price && (
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {item.currency} {price}
                </Text>
              </View>
            )}

            {item.releaseDate && (
              <Text style={styles.metaText}>
                Released: {new Date(item.releaseDate).toDateString()}
              </Text>
            )}

            {item.contentAdvisoryRating && (
              <Text style={styles.metaText}>
                Rating: {item.contentAdvisoryRating}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'column',
  },

  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },

  infoContainer: {
    alignItems: 'center',
    marginTop: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1c1c1e',
  },
  artist: {
    fontSize: 16,
    color: '#6e6e73',
    marginTop: 6,
  },
  genreBadge: {
    marginTop: 12,
    backgroundColor: '#e5e5ea',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  genreText: {
    fontSize: 13,
    color: '#333',
  },
  priceContainer: {
    marginTop: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  metaText: {
    marginTop: 8,
    fontSize: 13,
    color: '#8e8e93',
  },
  descriptionContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1c1c1e',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3a3a3c',
  },
  previewButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  previewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  videoContainer: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },

  video: {
    width: '100%',
    height: 220,
  },
});
