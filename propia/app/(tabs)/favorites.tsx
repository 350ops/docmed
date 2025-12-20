import React, { useState } from 'react';
import { View, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';
import Favorite from '@/components/Favorite';
import { Link } from 'expo-router';
import { shadowPresets } from '@/utils/useShadow';
import ThemeScroller from '@/components/ThemeScroller';
import { Placeholder } from '@/components/Placeholder';
import ShowRating from '@/components/ShowRating';
import { LinearGradient } from 'expo-linear-gradient';
import Grid from '@/components/layout/Grid';
import AnimatedView from '@/components/AnimatedView';
import Header, { HeaderIcon } from '@/components/Header';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import { useCollapsibleTitle } from '@/app/hooks/useCollapsibleTitle';


import { MOCK_DOCTORS } from '@/lib/doctors';

const savedItems = MOCK_DOCTORS.slice(0, 6).map((doctor) => ({
  id: doctor.id,
  title: doctor.name,
  description: doctor.specialty,
  image: { uri: doctor.image },
  doctorId: doctor.id,
}));

const FavoritesScreen = () => {
  const { width } = Dimensions.get('window');
  const [isEditMode, setIsEditMode] = useState(false);
  const { scrollY, scrollHandler, scrollEventThrottle } = useCollapsibleTitle();
  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <AnimatedView animation="scaleIn" className='flex-1'>
        <Header rightComponents={[
          <HeaderIcon
            icon={isEditMode ? "Check" : "Edit2"}
            onPress={() => setIsEditMode(!isEditMode)}
          />
        ]}
          title=""
          variant="collapsibleTitle"
          scrollY={scrollY}
        />
        <ThemeScroller
          onScroll={scrollHandler}
          scrollEventThrottle={scrollEventThrottle}
          className='pt-4 px-global'
        >
          <Section
            title="Favoritos"
            subtitle="Tus especialistas y servicios guardados"
            titleSize="3xl"
            className="mb-6"
          />

          {savedItems.length > 0 ? (
            <Grid columns={2} spacing={20} >
              {savedItems.map((item) => (
                <Card
                  href={`/screens/doctor-detail?id=${item.doctorId}`}
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  imageHeight={180}
                  rounded='2xl'
                >
                  {isEditMode && (
                    <Pressable className='absolute top-2 right-2 w-7 h-7 rounded-full bg-light-primary dark:bg-dark-primary items-center justify-center'>
                      <Icon name="X" size={18} strokeWidth={2} />
                    </Pressable>
                  )}
                </Card>
              ))}
            </Grid>
          ) : (
            <Placeholder
              title="No saved items in this category"
              subtitle="Browse services and save your favorites"
            />
          )}
        </ThemeScroller>
      </AnimatedView>
    </View>
  );
};

export default FavoritesScreen;

