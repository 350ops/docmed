import React, { useState } from 'react';
import { View, TextInput, Image, Pressable, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import useThemeColors from '@/contexts/ThemeColors';
import Input from '@/components/forms/Input';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedFooter from '@/components/ThemeFooter';

interface ReviewScreenProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}

const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
    const colors = useThemeColors();

    const handlePress = (starIndex: number) => {
        const newRating = starIndex + 1;
        setRating(newRating === rating ? 0 : newRating);
    };

    return (
        <View className="flex-row justify-center my-6">
            {[0, 1, 2, 3, 4].map((starIndex) => (
                <TouchableOpacity
                    key={starIndex}
                    onPress={() => handlePress(starIndex)}
                    className="w-10 h-10 justify-center items-center">
                    <FontAwesome
                        name={rating > starIndex ? 'star' : 'star-o'}
                        size={30}
                        color={rating > starIndex ? colors.icon : colors.text}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ReviewScreen = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const colors = useThemeColors();

    // Mock doctor data
    const product = {
        id: 1,
        name: 'Dra. Elena Martínez García',
        date: `Consulta del 12 de junio`,
        image: { uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face' }
    };

    const handleSubmit = () => {
        // Implement review submission logic
        console.log({ rating, review });
        router.back();
    };

    return (
        <>


            <Header
                title="Valorar consulta"
                showBackButton
            />
            <ThemedScroller
                className="flex-1 pt-8"
                keyboardShouldPersistTaps="handled"
            >
                {/* Doctor Information */}
                <View className="flex-col items-center mb-0">
                    <Image
                        source={product.image}
                        className="w-32 h-32 rounded-lg bg-light-secondary dark:bg-dark-secondary"
                    />
                    <View className="flex-1 items-center justify-center">
                        <ThemedText className="font-bold mt-global text-base">{product.name}</ThemedText>
                        <ThemedText className="text-light-subtext dark:text-dark-subtext">
                            {product.date}
                        </ThemedText>
                    </View>
                </View>

                {/* Star Rating */}
                <StarRating rating={rating} setRating={setRating} />

                <Input
                    label='Escribe tu reseña'
                    isMultiline
                    style={{
                        textAlignVertical: 'top',
                        height: 120
                    }}
                    value={review}
                    onChangeText={setReview}
                />


            </ThemedScroller>
            <ThemedFooter>
                <Button
                    title="Enviar reseña"
                    onPress={handleSubmit}
                    disabled={rating === 0 || !review.trim()}
                />
            </ThemedFooter>
        </>
    );
};

export default ReviewScreen;
