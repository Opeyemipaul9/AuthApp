import React from 'react';
import {View , Text, StyleSheet} from 'react-native';
import {Colors ,Typography , Spacing, Radius} from '../theme';

export const AlertBanner = ({message , variant ='error'}) => {
  if(!message) return null;
  const isError = variant === 'error';
  const isSuccess = variant === 'success';
  return (
    <View style ={[styles.container, isError && styles.error , isSuccess && styles.success]}
    accessibilityRole = 'alert'>

      <Text style={[styles.icon , isError && styles.errorIcon , isSuccess && styles.successIcon]}> {isError ? '❌' : '✅'} </Text>
      <Text style={[styles.message , isError && styles.errorText , isSuccess && styles.successText]}>{message}</Text>
    </View>
  )
}



const styles= StyleSheet.create ({
  container:{
    flexDirection:'row',
    alignItems:'flex-start',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderRadius: Radius.sm,
    marginBottom: Spacing.lg,
    borderWidth:1
  }, 
  error :{
    backgroundColor: Colors.dangerBg,
    borderColor:'rgba(239, 68, 68, 0.25)'
  }, 
  success:{
    backgroundColor:Colors.successBg,
    borderColor:'rgba(34,197,94,0.25)',
  },
  icon:{
    fontSize: Typography.sm,
    marginTop: 1
    },
  errorIcon:{
    color: Colors.danger
  },
  successIcon:{ 
    color: Colors.success
  },
  message:{ 
    fontSize: Typography.sm,  
    flex:1,
    lineHeight:20,

  },
  errorText :{ color :'#fca5a5'},
  successText :{ color: '#86efac'}
})