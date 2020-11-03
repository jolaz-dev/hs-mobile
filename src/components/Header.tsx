import {DrawerActions} from '@react-navigation/native';
import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Header as HeaderRNE} from 'react-native-elements';

interface HeaderProps {
  title?: string;
}

function Header(props: StackHeaderProps) {
  return (
    <HeaderRNE
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: () => props.navigation.dispatch(DrawerActions.openDrawer()),
      }}
      centerComponent={{
        text: props.scene.descriptor.options.title,
        style: styles.heading,
      }}
    />
  );
}

function SubHeader({title}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ED553B',
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export {Header, SubHeader};
