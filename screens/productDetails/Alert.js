import {AlertDialog, Button, Center} from 'native-base';
import React, {useRef, useState} from 'react';

const Alert = ({openAlert, setAlertOpen, title, DeleteCategory}) => {
  const onClose = () => setAlertOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={openAlert}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Confirmation!</AlertDialog.Header>
          <AlertDialog.Body>
            {title}
            This will remove all data relating to this product including all
            it's categories. This action cannot be reversed. Deleted data can
            not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  DeleteCategory();
                }}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default Alert;
