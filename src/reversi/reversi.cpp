#define _CRT_NO_SECURE_WARNINGS
#include <stdio.h>

int pan[9][9];
int turn=1;

int list[10];    int listLast=-1;

void ini_pan();
void print_pan();
void can_pan(int turn);
void ini_list();
void reversi(int turn, int pick);

int main(void){
	int finish=0;
	ini_pan();
	int pick=0;
	
	pan[3][3]=1;	pan[4][4]=1;
	pan[3][4]=-1;	pan[4][3]=-1;
	
	can_pan(turn);
	print_pan();
	
	//step of my turn
	while(finish<2){
		if(listLast==0) {
			printf("----------------\nturn=%d  number : X\n", turn);
			printf("----------------\n");
			turn*=-1;
			can_pan(turn);
			print_pan();
			finish++;
		}
		else {
			printf("----------------\nturn=%d  number :", turn);
			while(pick<1 || pick>listLast-1) scanf("%d", &pick);
			printf("----------------\n");
			pick=list[pick];
			ini_list();
			pan[pick/8][pick%8]=turn;
			reversi(turn, pick);
			turn*=-1;
			can_pan(turn);
			print_pan();
			
			pick=0;
			finish=0;
		}
	}
	
	printf("finish! turn %d win!", -turn);
	
	return 0;
}

void ini_pan(){
	for(int j=0; j<=8; j++){
		for(int i=0; i<=8; i++){
			pan[i][j]=0;
		}
	}
}
void print_pan(){
	for(int j=0; j<8; j++){
		for(int i=0; i<8; i++){
			printf("%d	",pan[i][j]);
		}
		printf("\n\n\n");
	}
}
void can_pan(int turn){
	int n=1;
	for(int j=0; j<8; j++){ for(int i=0; i<8; i++){//find routes
		if(pan[i][j]==0){
			while(i-n>0 && j+n<8)	{if(pan[i-n][j+n]==-turn) n++; else break;} if(n>1) {if(pan[i-n][j+n]==turn) pan[i][j]=100;} n=1;//1
			while(j+n<8)			{if(pan[i][j+n]==-turn)   n++; else break;} if(n>1) {if(pan[i][j+n]==turn)   pan[i][j]=100;} n=1;//2
			while(i+n<8 && j+n<8)	{if(pan[i+n][j+n]==-turn) n++; else break;} if(n>1) {if(pan[i+n][j+n]==turn) pan[i][j]=100;} n=1;//3
			while(i-n>0)			{if(pan[i-n][j]==-turn)   n++; else break;} if(n>1) {if(pan[i-n][j]==turn)   pan[i][j]=100;} n=1;//4
			while(i+n<8)			{if(pan[i+n][j]==-turn)   n++; else break;} if(n>1) {if(pan[i+n][j]==turn)   pan[i][j]=100;} n=1;//6
			while(i-n>0 && j-n>0)	{if(pan[i-n][j-n]==-turn) n++; else break;} if(n>1) {if(pan[i-n][j-n]==turn) pan[i][j]=100;} n=1;//7
			while(j-n>0)			{if(pan[i][j-n]==-turn)   n++; else break;} if(n>1) {if(pan[i][j-n]==turn)   pan[i][j]=100;} n=1;//8
			while(i+n<8 && j-n>0)	{if(pan[i+n][j-n]==-turn) n++; else break;} if(n>1) {if(pan[i+n][j-n]==turn) pan[i][j]=100;} n=1;//9
		}
	}}
	//fill the list
	for(int j=0; j<8; j++){ for(int i=0; i<8; i++){if(pan[i][j]==100){pan[i][j]+=n; list[n++]=i*8+j; listLast=n;}}}
}
void ini_list(){
	for(int i=0; i<listLast; i++){pan[list[i]/8][list[i]%8]=0; list[i]=-1;}
	listLast=0;
}
void reversi(int turn, int pick){
	int xx=pick/8; int yy=pick%8; int n=1;
	while(xx-n>0 && yy+n<8) {if(pan[xx-n][yy+n]==-turn) n++; else break;} if(xx-n>=0 && yy+n<=8)	{if(n>1) {if(pan[xx-n][yy+n]==turn) for(int nn=1; nn<n; nn++){pan[xx-nn][yy+nn]=turn;}}}	n=1;//1
	while(yy+n<8)		    {if(pan[xx][yy+n]==-turn)   n++; else break;} if(yy+n<=8)				{if(n>1) {if(pan[xx][yy+n]==turn)   for(int nn=1; nn<n; nn++){pan[xx][yy+nn]=turn;}}} 		n=1;//2
	while(xx+n<8 && yy+n<8) {if(pan[xx+n][yy+n]==-turn) n++; else break;} if(xx+n<=8 && yy+n<=8)	{if(n>1) {if(pan[xx+n][yy+n]==turn) for(int nn=1; nn<n; nn++){pan[xx+nn][yy+nn]=turn;}}}	n=1;//3
	while(xx-n>0)		    {if(pan[xx-n][yy]==-turn)   n++; else break;} if(xx-n>=0)				{if(n>1) {if(pan[xx-n][yy]==turn)   for(int nn=1; nn<n; nn++){pan[xx-nn][yy]=turn;}}} 		n=1;//4
	while(xx+n<8)		    {if(pan[xx+n][yy]==-turn)   n++; else break;} if(xx+n<=8)				{if(n>1) {if(pan[xx+n][yy]==turn)	for(int nn=1; nn<n; nn++){pan[xx+nn][yy]=turn;}}} 		n=1;//6
	while(xx-n>0 && yy-n>0) {if(pan[xx-n][yy-n]==-turn) n++; else break;} if(xx-n>=0 && yy-n>=0)	{if(n>1) {if(pan[xx-n][yy-n]==turn) for(int nn=1; nn<n; nn++){pan[xx-nn][yy-nn]=turn;}}} 	n=1;//7
	while(yy-n>0)		    {if(pan[xx][yy-n]==-turn)   n++; else break;} if(yy-n>=0)				{if(n>1) {if(pan[xx][yy-n]==turn)   for(int nn=1; nn<n; nn++){pan[xx][yy-nn]=turn;}}} 		n=1;//8
	while(xx+n<8 && yy-n>0) {if(pan[xx+n][yy-n]==-turn) n++; else break;} if(xx+n<=8 && yy-n>=0)	{if(n>1) {if(pan[xx+n][yy-n]==turn) for(int nn=1; nn<n; nn++){pan[xx+nn][yy-nn]=turn;}}} 	n=1;//9
}



