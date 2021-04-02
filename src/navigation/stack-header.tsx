import {DrawerActions} from '@react-navigation/native';
import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../style/colors';
import {isDarkModeSelected} from '../style/is-dark-mode-selected';

export function MainStackHeader(props: StackHeaderProps) {
  const toggleDrawer = () => {
    const {navigation} = props;
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={moderateScale(30)} color={AppColors.AliceBlue} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.scene.descriptor.options.headerTitle}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: moderateScale(7),
    flexDirection: 'row',
    alignItems: 'center',
    height: '60@ms',
    backgroundColor: isDarkModeSelected() ? AppColors.Manatee : AppColors.SpaceCadet,
  },
  title: {
    fontSize: '20@ms',
    color: AppColors.AliceBlue,
  },
});
