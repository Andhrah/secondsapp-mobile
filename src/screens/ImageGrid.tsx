import { useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';

import { AppButton, CloseButton, CustomCheckbox } from "../components";
import colors from "../constant/colors";
import images, { ImageItem } from "../constant/imageData";

const ImageGrid = () => {
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isSelectMultiple, setIsSelectMultiple] = useState(false);
  const [isPortraitVisible, setIsPortraitVisible] = useState(false);
  const [modalImageUri, setModalImageUri] = useState("");
  const [currentImageInView, setCurrentImageInView] = useState<ImageItem | null>(null);

  const toggleSelection = (image: ImageItem) => {
    setSelectedImages(prevImages => {
      const index = prevImages.findIndex(selected => selected.id === image.id);
      if (index >= 0) {
        // If found, deselect it
        return prevImages.filter(selected => selected.id !== image.id);
      } else {
        // If not found, select it
        return [...prevImages, { ...image, selected: true }];
      }
    });
  };

  // This function is used to open the modal with the selected image
  const openModal = (image: any) => {
    setModalImageUri(image.uri);
    setCurrentImageInView(image); // Set the current image
    setIsPortraitVisible(true);
  };

  // This function renders image grid
  const renderItem = ({ item }: { item: ImageItem }) => {

    const index = selectedImages.findIndex(selectedItem => selectedItem.id === item.id) + 1;
    const isSelected = selectedImages.some(selectedItem => selectedItem.id === item.id);

    return (
      <View style={imageWrapper}>
        <TouchableOpacity 
          onPress={() => openModal(item)}>
          <Image
            source={item.uri}
            style={image}
          />
          
          {
            isSelectMultiple && (
              <CustomCheckbox
                selected={isSelected}
                onSelect={(event) => {
                  event.stopPropagation(); // Prevents the modal from opening
                  toggleSelection(item);
                }}
                index={index}
                style={{right: 0}}
              />
            )
          }
        </TouchableOpacity>
      </View>
    );
  };

  // This function removes image from selected
  const removeImage = (image: ImageItem) => {
    setSelectedImages(prevImages => prevImages.filter(selected => selected.id !== image.id));
  };

  // Select open image
  const selectFromModal = () => {
    if (currentImageInView) {
      toggleSelection(currentImageInView);
      // setIsPortraitVisible(false); // Optionally close the modal after selection
    }
  };

  const { imageWrapper, image, rowContainer, headerText, tabContainer, tabActive, tab, tabText, row } = styles;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.appWhite}}>

      {
        !isPortraitVisible ? (
          <>
            <View style={rowContainer}>
              <CloseButton onPress={() => {}} />
              <Text style={headerText}>Recents</Text>
              <View />
            </View>

            <View style={tabContainer}>
              <TouchableOpacity
                style={activeTab === 'All' ? tabActive : tab}
                onPress={() => setActiveTab('All')}>
                <Text
                  style={[tabText, {
                    color: activeTab === 'All' ? colors.appPrimary : colors.steelGray,
                    fontWeight: activeTab === 'All' ? "700" : "400",
                  }]}>
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={activeTab === 'Photos' ? tabActive : tab}
                onPress={() => setActiveTab('Photos')}>
                <Text
                  style={[tabText, {
                    color: activeTab === 'Photos' ? colors.appPrimary : colors.steelGray,
                    fontWeight: activeTab === 'Photos' ? "700" : "400",
                  }]}>
                  Photos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={activeTab === 'Videos' ? tabActive : tab}
                onPress={() => setActiveTab('Videos')}>
                <Text
                  style={[tabText, {
                    color: activeTab === 'Videos' ? colors.appPrimary : colors.steelGray,
                    fontWeight: activeTab === 'Videos' ? "700" : "400",
                  }]}>
                  Videos
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={images}
              renderItem={renderItem}
              contentContainerStyle={{padding: 10}}
              keyExtractor={item => item.id}
              numColumns={3}
            />
          </>
        ) : (
          <>
            <View style={rowContainer}>
              <CloseButton name="arrow-left-s-line" onPress={() => {
                setIsPortraitVisible(!isPortraitVisible);
                setCurrentImageInView(null); // Reset the current image view
              }} />

              <TouchableOpacity style={row} onPress={selectFromModal}>
                <Text style={[headerText, {right: 0, marginRight: 10}]}>Select</Text>
                {
                  currentImageInView && selectedImages.some(image => image.id === currentImageInView.id) ?
                  <Icon name="checkbox-circle-fill" size={20} color={colors.appBlack} /> :
                  <Icon name="checkbox-blank-circle-line" size={20} color={colors.appBlack} />
                }
              </TouchableOpacity>
              
            </View>

            <View style={{height: hp(12), width: wp(100), backgroundColor: "#20221C"}} />

            <View style={styles.centeredView}>
              <Image
                source={modalImageUri}
                style={styles.fullImage}
                resizeMode="contain"
              />
            </View>
          </>
        )
      }

      {
        selectedImages.length > 0 && (
          <View>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {selectedImages.map((image) => (
                <View key={image.id} style={styles.selectedImageWrapper}>
                  <Image source={image.uri} style={styles.selectedImage} />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => removeImage(image)}>
                    <Image
                      source={require("../../assets/images/close_img.png")}
                      style={{height: 20, width: 20, resizeMode: "contain"}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )
      }

      <View style={styles.footerStyle}>
        <TouchableOpacity
          onPress={() => setIsSelectMultiple(!isSelectMultiple)}
          style={row}>
          {
            !isSelectMultiple ? (
              <Icon name="checkbox-blank-circle-line" size={24} color={colors.appBlack} />
            ) : (
              <Icon name="checkbox-circle-fill" size={24} color={colors.appBlack} />
            )
          }
          <Text style={{color: colors.appBlack, fontSize: hp(2), fontWeight: "500", marginLeft: 8}}>Select Multiple</Text>
        </TouchableOpacity>

        <AppButton
          style={{backgroundColor: selectedImages.length > 0 ? colors.appPrimary : colors.lightAsh}}
          textStyle={{color: selectedImages.length > 0 ? colors.appWhite : colors.darkAsh}}
          onPress={() => {}}>
            Next
        </AppButton>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: hp(2.3), 
    color: colors.steelGray, 
    right: 25, 
    fontWeight: "500"
  },
  imageWrapper: {
    margin: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  image: {
    width: wp(28),
    height: hp(14),
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tabText: {
    fontSize: hp(2),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    borderTopWidth: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  selectedImageWrapper: {
    position: 'relative',
    margin: 8,
  },
  selectedImage: {
    width: wp(18),
    height: hp(9),
    borderRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    right: -8,
    top: -8,
    borderRadius: 12,
    padding: 2,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp(100), 
    height: hp(100),
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  fullImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  customCheckboxPosition: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ImageGrid;
