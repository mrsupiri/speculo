# Model v12
Optimizer - adam (LR - 0.001) <br>
Loss Function - mse <br>
Input Shape - (128, 128, 1) <br>
Output Shape - (64, 64, 1) <br>
Encoding Filters - (512, 256, 128) <br>
Decoding Filters - (128, 256) <br>
Latent Size - 256 <br>

### Dataset Sample
![DataSet](img/dataset.png)

## Model Summary
```shell script
Model: "Speculo-v12"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
input (InputLayer)           [(None, 128, 128, 1)]     0         
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 128, 128, 512)     5120      
_________________________________________________________________
max_pooling2d_3 (MaxPooling2 (None, 64, 64, 512)       0         
_________________________________________________________________
conv2d_4 (Conv2D)            (None, 64, 64, 256)       1179904   
_________________________________________________________________
max_pooling2d_4 (MaxPooling2 (None, 32, 32, 256)       0         
_________________________________________________________________
dropout_2 (Dropout)          (None, 32, 32, 256)       0         
_________________________________________________________________
conv2d_5 (Conv2D)            (None, 32, 32, 128)       295040    
_________________________________________________________________
max_pooling2d_5 (MaxPooling2 (None, 16, 16, 128)       0         
_________________________________________________________________
flatten_1 (Flatten)          (None, 32768)             0         
_________________________________________________________________
latent_space (Dense)         (None, 256)               8388864   
_________________________________________________________________
dense_1 (Dense)              (None, 32768)             8421376   
_________________________________________________________________
reshape_1 (Reshape)          (None, 16, 16, 128)       0         
_________________________________________________________________
conv2d_transpose_3 (Conv2DTr (None, 32, 32, 128)       147584    
_________________________________________________________________
batch_normalization_2 (Batch (None, 32, 32, 128)       512       
_________________________________________________________________
dropout_3 (Dropout)          (None, 32, 32, 128)       0         
_________________________________________________________________
conv2d_transpose_4 (Conv2DTr (None, 64, 64, 256)       295168    
_________________________________________________________________
batch_normalization_3 (Batch (None, 64, 64, 256)       1024      
_________________________________________________________________
conv2d_transpose_5 (Conv2DTr (None, 64, 64, 1)         2305      
_________________________________________________________________
output (Activation)          (None, 64, 64, 1)         0         
=================================================================
Total params: 18,736,897
Trainable params: 18,736,129
Non-trainable params: 768
_________________________________________________________________
```
![Model](img/model.png)

## Training Log
```shell script

```

### Model loss
![loss](img/loss.png)

## Predictions 
![loss](img/predictions.png)

## Notes
- Decreased the number of hidden layers and layer sizes to have larger amount of Trainable params.
- This Model has the lowest loss but the validation loss is not that good