import React, { useState } from "react"
import { View, Text } from "@/components/Themed"
import BaseTextInput from "@/components/Inputs/BaseTextInput"
import { Pressable, StyleSheet } from "react-native"
import { useForm } from "react-hook-form"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import * as DocumentPicker from "expo-document-picker"
import { MaterialIcons } from "@expo/vector-icons"
import CTA from "@/components/CTA/CTA"

export default function AddFileToServiceScreen() {
    // set up state to save the form's progress and edit functionality (in the future)
    type fileAdditionFormData = {
        uri: string,
        fileName: string
    }
    const addFileRequest = useMutation(api.files.sendFile)
    const generateFileUploadUrl = useMutation(api.files.generateUploadUrl)

    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null | undefined>(null)

    // set up file uploads
    async function uploadFile() {
        const filePostUrl = await generateFileUploadUrl()
        const fileData = await fetch(selectedFile!.uri)
        if (!fileData.ok) {
            console.error("Error loading file", fileData)
            return
        }
        console.log(`Loaded file ${fileData}`)

        const blob = await fileData.blob()

        try{
            const request = await fetch(filePostUrl, {
                method: "POST",
                headers: {
                    "Content-Type": selectedFile!.mimeType!
                },
                body: blob
            })

            if(!request.ok){
                console.error("Upload failed")
                return
            }

            const { storageId } = await request.json()

            const uploadFile = await addFileRequest({storageId, author: "paul", format: selectedFile?.mimeType!})
            console.log(`Upload complete.`)

            return uploadFile

        }catch(err){
            console.error("Upload failed")
            throw err
        }
    }
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text>Upload File</Text>
            </View>
            <View style={style.body}>
                <Pressable style={style.uploadCard} onPress={async()=>setSelectedFile(await LoadFileFromFilesystem())}>
                    <Text>Select a picture</Text>
                    <MaterialIcons name="image" color="white"/>
                    {selectedFile && <Text>{selectedFile.name}</Text>}
                </Pressable>
                <CTA action={uploadFile} text="Upload file"/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    body: {

    },
    header: {

    },
    container:{

    },
    uploadCard: {

    }
})

async function LoadFileFromFilesystem(): Promise<DocumentPicker.DocumentPickerAsset | undefined | null>{
    const file = await DocumentPicker.getDocumentAsync()

    if(file.assets){
        return file.assets[0]
    }else{
        return file.output
    }
}