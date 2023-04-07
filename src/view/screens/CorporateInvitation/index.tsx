import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { TextField } from '~/view/components/form/TextField';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';

export const CorporateInvitationScreen: React.VFC = () => {
  const form = useForm();
  const styles = useStyles();

  return (
    <MainContainer>
      <StackHeader text="Corporate card invitation" />
      <View style={styles.container}>
        <Text variant="h1" textAlign="center">
          Add card via invitation code
        </Text>
        <Text variant="p2" textAlign="center" style={{ marginTop: 8 }}>
          Please enter the invitation code your{'\n'} workplace sent to taylor@swop.tech
        </Text>
        <TextField
          name="code"
          control={form.control}
          label="Invitation code"
          style={styles.input}
        />
        <Button styleType={ButtonStyleType.PRIMARY} label="Continue" containerStyle={styles.btn} />
      </View>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    paddingHorizontal: 25,
    marginTop: 47,
  },
  input: {
    marginTop: 38,
  },
  btn: {
    marginTop: 30,
  },
});
