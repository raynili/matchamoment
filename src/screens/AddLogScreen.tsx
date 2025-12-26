import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMatcha } from '../context/MatchaContext';
import { Input } from '../components/ui/Input';
import { StarRating } from '../components/ui/StarRating';
import { Button } from '../components/ui/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddLog'>;

export const AddLogScreen = ({ navigation, route }: Props) => {
  const { logs, addLog, updateLog } = useMatcha();
  const { logId } = route.params || {};
  const isEditing = !!logId;

  // Form state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [origin, setOrigin] = useState('');
  const [umami, setUmami] = useState(3);
  const [sweetness, setSweetness] = useState(3);
  const [bitterness, setBitterness] = useState(3);
  const [notes, setNotes] = useState('');
  const [powderGrams, setPowderGrams] = useState('');
  const [waterMl, setWaterMl] = useState('');
  const [milkMl, setMilkMl] = useState('');

  // Errors
  const [nameError, setNameError] = useState('');
  const [powderError, setPowderError] = useState('');

  // Load existing log if editing
  useEffect(() => {
    if (isEditing && logId) {
      const log = logs.find(l => l.id === logId);
      if (log) {
        setName(log.name);
        setBrand(log.brand || '');
        setOrigin(log.origin || '');
        setUmami(log.umami);
        setSweetness(log.sweetness);
        setBitterness(log.bitterness);
        setNotes(log.notes.join(', '));
        setPowderGrams(log.powderGrams.toString());
        setWaterMl(log.waterMl?.toString() || '');
        setMilkMl(log.milkMl?.toString() || '');
      }
    }
  }, [isEditing, logId, logs]);

  const validate = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Matcha name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!powderGrams.trim() || parseFloat(powderGrams) <= 0) {
      setPowderError('Powder amount is required and must be greater than 0');
      isValid = false;
    } else {
      setPowderError('');
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    const logData = {
      name: name.trim(),
      brand: brand.trim() || undefined,
      origin: origin.trim() || undefined,
      umami,
      sweetness,
      bitterness,
      notes: notes.trim() ? notes.split(',').map(n => n.trim()).filter(Boolean) : [],
      powderGrams: parseFloat(powderGrams),
      waterMl: waterMl.trim() ? parseFloat(waterMl) : undefined,
      milkMl: milkMl.trim() ? parseFloat(milkMl) : undefined,
    };

    if (isEditing && logId) {
      updateLog(logId, logData);
      Alert.alert('Success', 'Log updated successfully!');
    } else {
      addLog(logData);
      Alert.alert('Success', 'Log created successfully!');
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Identity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identity</Text>
            
            <Input
              label="Matcha Name"
              placeholder="e.g., Ceremonial Grade"
              value={name}
              onChangeText={setName}
              required
              error={nameError}
            />

            <Input
              label="Brand"
              placeholder="e.g., Ippodo"
              value={brand}
              onChangeText={setBrand}
            />

            <Input
              label="Origin"
              placeholder="e.g., Uji, Japan"
              value={origin}
              onChangeText={setOrigin}
            />
          </View>

          {/* Flavour Profile Section */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flavour Profile</Text>
            <StarRating
          label="Umami"
          value={umami}
          onChange={setUmami}
        />

        <StarRating
          label="Sweetness"
          value={sweetness}
          onChange={setSweetness}
        />

        <StarRating
          label="Bitterness"
          value={bitterness}
          onChange={setBitterness}
        />
      </View>

      {/* Tasting Notes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasting Notes</Text>
        
        <Input
          label="Notes"
          placeholder="e.g., vegetal, creamy, grassy"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          style={{ textAlignVertical: 'top' }}
        />
        <Text style={styles.hint}>
          Separate notes with commas
        </Text>
      </View>

      {/* Brewing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brewing Ratio</Text>
        
        <Input
          label="Matcha Powder"
          placeholder="e.g., 2"
          value={powderGrams}
          onChangeText={setPowderGrams}
          keyboardType="decimal-pad"
          required
          error={powderError}
        />
        <Text style={styles.hint}>In grams</Text>

        <Input
          label="Water"
          placeholder="e.g., 60"
          value={waterMl}
          onChangeText={setWaterMl}
          keyboardType="decimal-pad"
        />
        <Text style={styles.hint}>In milliliters (optional)</Text>

        <Input
          label="Milk"
          placeholder="e.g., 200"
          value={milkMl}
          onChangeText={setMilkMl}
          keyboardType="decimal-pad"
        />
        <Text style={styles.hint}>In milliliters (optional)</Text>
      </View>

      {/* Save Button */}
      <Button
        title={isEditing ? 'Update Log' : 'Save Log'}
        onPress={handleSave}
      />
      <View style={{ height: 16 }} />
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: colors.matcha[50],
},
keyboardView: {
flex: 1,
},
scrollView: {
flex: 1,
},
scrollContent: {
padding: 16,
},
section: {
backgroundColor: colors.white,
borderRadius: 16,
padding: 16,
marginBottom: 16,
},
sectionTitle: {
fontSize: 18,
fontWeight: 'bold',
color: colors.gray[900],
marginBottom: 16,
},
hint: {
fontSize: 12,
color: colors.gray[500],
marginTop: -8,
marginBottom: 16,
},
});